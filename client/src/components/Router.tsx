import { Switch, Route } from "wouter";
import { PATHS } from "./path";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function Router() {
    const { HOME, PRODUCTS, PRODUCT_DETAIL, NOT_FOUND } = PATHS

    // Add artificial delay to test loading spinner
    const Home = lazy(() => import("@/pages/Home"));
    const Products = lazy(() => import("@/pages/Products"));
    const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
    const NotFound = lazy(() => import("@/pages/not-found"));

    return (
        <Suspense fallback={
            <LoadingSpinner />
        }>
            <Switch>
                <Route path={HOME} component={Home} />
                <Route path={PRODUCTS} component={Products} />
                <Route path={PRODUCT_DETAIL} component={ProductDetail} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    )
}