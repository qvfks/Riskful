import { buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import { env } from "@/env";
import Link from "next/link";
import { Fragment } from "react";

export async function HeaderAuth() {
    const staticMode = env.NEXT_PUBLIC_STATIC_MODE === "on";
    let user: null | { id?: string } = null;
    if (!staticMode) {
        const { getUser } = await import("@/server/auth");
        user = await getUser();
    }

    return (
        <section className="flex items-center space-x-2">
            {user ? (
                <Link
                    href={siteUrls.dashboard.home}
                    className={buttonVariants({
                        className: "flex items-center space-x-1",
                    })}
                >
                    <span>Dashboard</span>
                </Link>
            ) : staticMode ? (
                <Link
                    href={siteUrls.pricing}
                    className={buttonVariants({
                        className: "flex items-center space-x-1",
                    })}
                >
                    <span>Get Started</span>
                </Link>
            ) : (
                <Fragment>
                    <Link
                        href={siteUrls.auth.signup}
                        className={buttonVariants({
                            className: "flex items-center space-x-1",
                        })}
                    >
                        <span>Sign Up</span>
                        <span className="font-light italic"> it&apos;s free</span>
                    </Link>
                </Fragment>
            )}
        </section>
    );
}
