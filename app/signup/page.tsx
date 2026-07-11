'use client';

import { signup } from '@/lib/helper/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Bolt, Lock, Mail, MoveRight, PersonStandingIcon, Shield } from "lucide-react";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (password !== verifyPassword) {
                setError("Verify password must matches the password");
            } else {
                const formData = new FormData(e.currentTarget);
                const result = await signup(formData);

                if (result?.error) {
                    setError("Failed to register, please try again")
                    console.log("signup error: ", result.error);
                } else if (result?.success) {
                    router.push('/login')
                }
            }

        } catch (error) {
            setError("Failed to register, please try again")
            console.log("signup error: ", error);
        } finally {
            setLoading(false);
        }
    }
    

  // Mimic the exact simple interaction & focus feedback from the original script
    useEffect(() => {
        const interactiveElements = document.querySelectorAll('button, a');
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleMouseDown = (e: any) => { e.currentTarget.style.opacity = '0.7'; };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleMouseUpOrLeave = (e: any) => { e.currentTarget.style.opacity = '1'; };

        interactiveElements.forEach(el => {
            el.addEventListener('mousedown', handleMouseDown);
            el.addEventListener('mouseup', handleMouseUpOrLeave);
            el.addEventListener('mouseleave', handleMouseUpOrLeave);
        });

        const inputs = document.querySelectorAll('input');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleFocus = (e: any) => {
        const wrapper = e.currentTarget.parentElement?.parentElement;
        if (wrapper) {
            wrapper.classList.add('scale-[1.01]', 'transition-transform');
        }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleBlur = (e: any) => {
        const wrapper = e.currentTarget.parentElement?.parentElement;
        if (wrapper) {
            wrapper.classList.remove('scale-[1.01]');
        }
        };

        inputs.forEach(input => {
            input.addEventListener('focus', handleFocus);
            input.addEventListener('blur', handleBlur);
        });

        return () => {
        interactiveElements.forEach(el => {
            el.removeEventListener('mousedown', handleMouseDown);
            el.removeEventListener('mouseup', handleMouseUpOrLeave);
            el.removeEventListener('mouseleave', handleMouseUpOrLeave);
        });
        inputs.forEach(input => {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
        });
        };
    }, []);


    return (
        <>
        {/* Dynamic injection of external styles to preserve pure CSS features safely */}
        <style dangerouslySetInnerHTML={{__html: `
            .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            }
            .glass-panel {
            background: rgba(25, 31, 47, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(66, 71, 84, 0.5);
            }
            .auth-grid-bg {
            background-image: radial-gradient(circle at 2px 2px, rgba(173, 198, 255, 0.05) 1px, transparent 0);
            background-size: 32px 32px;
            }
        `}} />

        <div className="bg-background text-on-background font-body-md min-h-screen w-full flex items-center justify-center auth-grid-bg px-margin-mobile md:px-lg relative overflow-x-hidden">
            {/* Subtle Background Ambient Light */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] pointer-events-none"></div>
            
            <main className="w-full max-w-[480px] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Logo Branding */}
            <div className="flex flex-col items-center mb-xl">
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg mb-md">
                <span className="material-symbols-outlined text-on-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}><Bolt/></span>
                </div>
                <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">EventFlow</h1>
                <p className="text-on-surface-variant text-body-md mt-xs">Optimize your high-performance schedule.</p>
            </div>

            {/* Glassmorphism Auth Card */}
            <div className="glass-panel p-lg md:p-xl rounded-xl shadow-2xl">
                <h2 className="text-title-md font-title-md mb-lg text-primary">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-md" method="POST">
                {/* Username */}
                    <div className="space-y-xs">
                        <label className="text-label-sm font-label-sm text-on-surface-variant" htmlFor="username">Username</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors"><PersonStandingIcon/></span>
                            <input 
                                className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-on-surface rounded-lg py-3 pl-10 pr-md transition-all outline-none" 
                                id="username" 
                                name="username" 
                                placeholder="johndoe" 
                                required 
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-xs">
                        <label className="text-label-sm font-label-sm text-on-surface-variant" htmlFor="email">Email Address</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors"><Mail/></span>
                            <input 
                                className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-on-surface rounded-lg py-3 pl-10 pr-md transition-all outline-none" 
                                id="email" 
                                name="email" 
                                placeholder="john@company.com" 
                                required 
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-xs">
                        <label className="text-label-sm font-label-sm text-on-surface-variant" htmlFor="password">Password</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors"><Lock size={20}/></span>
                            <input 
                                className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-on-surface rounded-lg py-3 pl-10 pr-md transition-all outline-none" 
                                id="password" 
                                name="password" 
                                placeholder="••••••••" 
                                required 
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Retype Password */}
                    <div className="space-y-xs">
                        <label className="text-label-sm font-label-sm text-on-surface-variant" htmlFor="repassword">Retype Password</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors"><Shield size={20}/></span>
                            <input 
                                className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-on-surface rounded-lg py-3 pl-10 pr-md transition-all outline-none" 
                                id="repassword" 
                                name="repassword" 
                                placeholder="••••••••" 
                                required 
                                type="password"
                                onChange={(e) => setVerifyPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>   
                        {
                            error && (
                                <span className="text-red-600 italic text-sm font-medium flex items-center gap-1.5 mt-1">
                                    {error}
                                </span>
                            )
                        }
                    </div>
                    
                    
                    {/* Action Button */}
                    <button 
                        className="w-full bg-primary text-on-primary font-title-md py-3 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-sm mt-lg disabled:opacity-70 disabled:pointer-events-none" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                {/* Tailwind Spinner */}
                                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Processing ...</span>
                            </>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <span className="material-symbols-outlined text-[20px]"><MoveRight size={10} /></span>
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-lg">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant"></div>
                </div>
                <div className="relative flex justify-center text-label-sm">
                    <span className="bg-[#191f2f] px-md text-outline font-label-sm">OR SIGN UP WITH</span>
                </div>
                </div>

                {/* Social Sign Up */}
                <div className="grid grid-cols-2 gap-md">
                <button className="flex items-center justify-center gap-sm bg-surface-container-low border border-outline-variant py-sm rounded-lg text-on-surface hover:bg-surface-container-high transition-colors active:scale-95">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="currentColor"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="currentColor"></path>
                    </svg>
                    <span className="text-label-sm">Google</span>
                </button>
                <button className="flex items-center justify-center gap-sm bg-surface-container-low border border-outline-variant py-sm rounded-lg text-on-surface hover:bg-surface-container-high transition-colors active:scale-95">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"></path>
                    </svg>
                    <span className="text-label-sm">GitHub</span>
                </button>
                </div>
            </div>

            {/* Login Link */}
            <div className="mt-lg text-center">
                <p className="text-on-surface-variant font-body-md">
                Already have an account? 
                <a className="text-primary font-bold hover:underline ml-xs transition-all decoration-primary/30 underline-offset-4" href="/login">Log in here</a>
                </p>
            </div>

            {/* Footer Policy Links */}
            <footer className="mt-xl flex justify-center gap-lg text-label-sm text-outline opacity-60">
                <a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-on-surface transition-colors" href="#">Terms of Service</a>
                <a className="hover:text-on-surface transition-colors" href="#">Help Center</a>
            </footer>
            </main>
        </div>
        </>
    );
}