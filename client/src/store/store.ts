import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CryptoJS from 'crypto-js';
import productDetailReducer from './productDetailSlice';

const PERSIST_VERSION = 2;
const STORAGE_VERSION_KEY = 'ktr-persist-version';

const getEncryptionKey = () => {
  if (typeof window !== 'undefined') {
    const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    if (storedVersion !== String(PERSIST_VERSION)) {
      localStorage.clear();
      localStorage.setItem(STORAGE_VERSION_KEY, String(PERSIST_VERSION));
    }

    if (window.crypto) {
      const stored = localStorage.getItem('ktr-ek');
      if (stored) return stored;
      
      const array = new Uint8Array(32);
      window.crypto.getRandomValues(array);
      const key = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('ktr-ek', key);
      return key;
    }
  }
  return 'ktr-cycle-world-fallback-key';
};

const ENCRYPTION_KEY = getEncryptionKey();

const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
};

const decrypt = (ciphertext: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      console.warn('Decryption resulted in empty string');
      return '{}';
    }
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return '{}';
  }
};

const encryptTransform = {
  in: (state: any) => {
    try {
      return encrypt(JSON.stringify(state));
    } catch (error) {
      console.error('Encryption error:', error);
      return state;
    }
  },
  out: (state: any) => {
    try {
      if (typeof state === 'string') {
        const decrypted = decrypt(state);
        return JSON.parse(decrypted);
      }
      return state;
    } catch (error) {
      console.error('Decryption error:', error);
      return state;
    }
  },
};

const persistConfig = {
  key: 'ktr-root',
  storage,
  transforms: [encryptTransform],
  whitelist: ['productDetail'],
};

const rootReducer = {
  productDetail: productDetailReducer,
};

const persistedReducer = persistReducer(persistConfig, (state: any = {}, action: any) => {
  return Object.keys(rootReducer).reduce((acc, key) => {
    acc[key] = rootReducer[key as keyof typeof rootReducer](state[key], action);
    return acc;
  }, {} as any);
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
