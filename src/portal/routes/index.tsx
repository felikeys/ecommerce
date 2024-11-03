import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AuthLoader, RootLayout } from "../layout";
import { ROUTES } from "@/lib/constants";
import AuthLayout from "./auth-layout";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<RootLayout />} loader={AuthLoader}>
        <Route path="*" element={<h1>404</h1>} />
        <Route path="" element={<AuthLayout />}>
        
        <Route path={ROUTES.login()} lazy={async () =>  { return {
              Component: (await import("@/components/pages/login/index"))
                .default,
            }; }} />
        </Route>
        </Route>
        </>
    )
);