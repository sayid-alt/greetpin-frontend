'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from "next-auth/react"
import { Calendar1Icon, Lock, PersonStanding } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [isFocused, setIsFocused] = useState(false);

    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                username,
                password
            });

            if (result?.error) {
                setError("Credential is invalid")
            } else {
                router.push("/");
                router.refresh();
            }
        
        } catch (error) {
            setError("Something wrong, try again!")
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden p-[16px] bg-[#0c1322]">
            {/* Atmospheric Background Animation Element */}
            <div className="absolute inset-0 z-0"></div>

            {/* Login Container */}
            <main className="relative z-10 w-full max-w-[440px] animate-in fade-in zoom-in duration-500">
                <div className={
                    `rounded-xl p-[48px] shadow-2xl flex flex-col gap-[24px] py-[16px] transition-all 
                    duration-200 ${isFocused ? 'ring-1 ring-primary/20' : ''}`
                }>
                
                {/* Branding Header */}
                <div className="flex flex-col items-center gap-[4px] mb-[8px]">
                    <div className="w-16 h-16 bg-primary-container rounded-xl flex items-center justify-center mb-[8px] shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-on-primary-container text-[40px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                            <Calendar1Icon />
                        </span>
                    </div>
                    <h1 className="text-[32px] leading-[40px] tracking-tight font-semibold text-on-surface">EventFlow</h1>
                    <p className="text-[16px] leading-[24px] font-normal text-on-surface-variant">Precision planning for power users</p>
                </div>

                {/* Login Form */}
                <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit}>
                    <div className="space-y-[8px]">
                        <label className="text-[12px] leading-[16px] font-medium text-on-surface-variant block uppercase tracking-wider" htmlFor="email">
                            Email or Username
                        </label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors pointer-events-none z-10">
                                <PersonStanding />
                            </span>
                            <input
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-[16px] pl-[48px] pr-[16px] text-on-surface text-[16px] leading-[24px] font-normal placeholder:text-outline/50 focus:border-primary transition-all duration-200 relative z-0"
                                id="email"
                                placeholder="e.g. alex.flow@corporate.com"
                                type="text"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-[8px]">
                        <div className="flex justify-between items-end">
                            <label className="text-[12px] leading-[16px] font-medium text-on-surface-variant block uppercase tracking-wider" htmlFor="password">
                                Password
                            </label>
                            <Link className="text-[12px] leading-[16px] font-medium text-primary hover:underline transition-all" href="#">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors pointer-events-none z-10">
                                <Lock />
                            </span>
                            <input
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-[16px] pl-[48px] pr-[16px] text-on-surface text-[16px] leading-[24px] font-normal placeholder:text-outline/50 focus:border-primary transition-all duration-200 relative z-0"
                                id="password"
                                placeholder="••••••••••••"
                                type="password"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        {
                            error && (
                                <span>{error}</span>
                            )
                        }
                    </div>

                    <div className="flex items-center gap-[8px] mt-[4px]">
                        <input
                            className="w-5 h-5 rounded bg-surface-container-lowest border-outline-variant text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer"
                            id="remember"
                            type="checkbox"
                        />
                        <label className="text-[16px] leading-[24px] font-normal text-on-surface-variant cursor-pointer select-none" htmlFor="remember">
                            Keep me signed in
                        </label>
                    </div>

                    <button
                        className="mt-[16px] w-full bg-primary py-[16px] rounded-xl text-on-primary text-[18px] leading-[24px] font-semibold hover:bg-primary-fixed-dim active:scale-95 transition-all duration-200 shadow-lg shadow-primary/10 cursor-pointer"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center py-[8px]">
                    <div className="flex-grow border-t border-outline-variant"></div>
                    <span className="flex-shrink mx-[16px] text-[12px] leading-[16px] font-medium text-outline uppercase tracking-widest">
                        Or continue with
                    </span>
                    <div className="flex-grow border-t border-outline-variant"></div>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-[16px]">
                    <button className="flex items-center justify-center gap-[8px] bg-surface-container-low border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors text-[16px] leading-[24px] font-normal text-on-surface py-[16px]">
                        <img
                            className="w-5 h-5"
                            alt="Official Google G-logo in full brand colors, isolated on a transparent background, high-resolution vector style icon."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeFfhJHEwzDwZbRkU7PxZ0FjU7J8MnSWi5rPpTXK6Xkh53oLuy2rmTBhnYdf-tFxqn9BvlFUufSJs76Z4cNtDnif01ZXmg3K59KfJd3xpiEAPuxUXdoFE1W-TYh7DA1NgaMXGO9W6r42iW3QDCNpF3M08G5iUTWVAISWL311O1-miVxzwMojqUzLTNcJ6ZujtrVGIWe9WHBHmTi_LptZAAhM9bIi_bOalwI5uGgHBT8-84Imt_uHCW_lnSzeo1FUKgOIjzcj0gWej7"
                        />
                        Google
                    </button>
                    <button className="flex items-center justify-center gap-[8px] bg-surface-container-low border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors text-[16px] leading-[24px] font-normal text-on-surface py-[16px]">
                        <img
                            className="w-5 h-5 invert"
                            alt="GitHub octocat brand logo in sleek white, high contrast against a dark corporate background, minimalist and high-resolution iconography."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnI_tY04JZsyNmk4yirEusmtnIqxQP-ql52CFOzIaTdYFYpqhDrXMYFKu4mTCyXHXpKlDY7gQHgMCi2NHHNNfWvvk47BVeJCXsB0HYrK9HWffQIQYjWx8EPH381iU4wtxflDYq315Y9qQFUpJv8tLD9-rtQBljApEKdEUIRzAE8-K6O24ko-MGyZeDzRy9B9e31szZVJH8B-Os4mcL4Pyw1Y-gNm7O9bZq0oiWQJkCyaxuVcL3wsSMA-RXd69NJVNLc1dmtb-miRAX"
                        />
                        GitHub
                    </button>
                </div>

                {/* Footer Link */}
                <div className="mt-[16px] text-center flex justify-center">
                    <p className="text-[16px] leading-[24px] font-normal text-on-surface-variant">
                        Don't have an account?{' '}
                        <Link className="text-primary font-bold hover:underline ml-[4px]" href="#">
                            Sign up
                        </Link>
                    </p>
                </div>
                </div>

                {/* System Status Footer */}
                <div className="mt-[48px] flex justify-center gap-[24px]">
                    <div className="flex items-center gap-[4px]">
                        <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.5)]"></div>
                        <span className="text-[12px] leading-[16px] font-medium text-on-surface-variant/70 uppercase">
                            System Operational
                        </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                        <span className="material-symbols-outlined text-on-surface-variant/50 text-[16px]">public</span>
                        <span className="text-[12px] leading-[16px] font-medium text-on-surface-variant/70 uppercase">
                            US-EAST-1
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}