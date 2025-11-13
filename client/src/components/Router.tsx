import { Switch, Route, Redirect } from "wouter";
import { PATHS } from "./path";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function Router() {
    const { HOME, PRODUCTS, PRODUCT_DETAIL, ABOUT, CONTACT, PRIVACY_POLICY, TERMS_OF_SERVICE } = PATHS

    // Add artificial delay to test loading spinner
    const Home = lazy(() => import("@/pages/Home"));
    const Products = lazy(() => import("@/pages/Products"));
    const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
    const NotFound = lazy(() => import("@/pages/not-found"));
    const About = lazy(() => import("@/pages/AboutUs"));
    const Contact = lazy(() => import("@/pages/ContactUs"));
    const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
    const TermsOfService = lazy(() => import("@/pages/TermsOfService"));

    return (
        <Suspense fallback={
            <LoadingSpinner />
        }>
            <Switch>
                <Route path={HOME} component={Home} />
                <Route path={PRODUCTS} component={Products} />
                <Route path={PRODUCT_DETAIL} component={ProductDetail} />
                <Route path={ABOUT} component={About} />
                <Route path={CONTACT} component={Contact} />
                <Route path={PRIVACY_POLICY} component={PrivacyPolicy} />
                <Route path={TERMS_OF_SERVICE} component={TermsOfService} />
                <Route>
                    <Redirect to={HOME} />
                </Route>
            </Switch>
        </Suspense>
    )
}