import { Head, Link } from '@inertiajs/react';
import type { Auth } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';

interface Props {
    auth: Auth;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Head title="Welcome to Aurora Dental Clinic" />

            <header className="fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto px-4">
                    <div className="flex gap-2 items-center text-xl font-bold tracking-tight text-primary">
                        <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif">A</span>
                        Aurora Dental
                    </div>
                    <nav className="flex items-center space-x-4">
                        {auth.user ? (
                            <Button asChild variant="ghost">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild variant="ghost">
                                    <Link href="/login">Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">Register</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                <section className="space-y-6 pb-8 pt-24 md:pb-12 md:pt-32 lg:py-40">
                    <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
                        <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
                            🌟 New Patient Specials Available
                        </div>
                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                            Your Smile is Our <br /><span className="text-primary">Masterpiece</span>
                        </h1>
                        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                            Experience world-class dental care with Aurora Dental Clinic. From routine checkups to complex cosmetic procedures, we ensure your comfort every step of the way.
                        </p>
                        <div className="space-x-4 mt-4">
                            <Button asChild size="lg" className="h-12 px-8">
                                <Link href={auth.user ? "/portal/appointments" : "/login"}>
                                    Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-12 px-8">
                                <a href="#services">Our Services</a>
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="services" className="container space-y-6 py-8 md:py-12 lg:py-24 mx-auto px-4 bg-muted/50 rounded-3xl">
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">Premium Dental Services</h2>
                        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                            Comprehensive oral care tailored to your unique needs using state-of-the-art technology.
                        </p>
                    </div>

                    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 pt-8">
                        {[
                            { title: 'General Checkups', desc: 'Routine cleanings and examinations.' },
                            { title: 'Cosmetic Dentistry', desc: 'Whitening, veneers, and smile makeovers.' },
                            { title: 'Orthodontics', desc: 'Braces and clear aligners for perfect alignment.' },
                            { title: 'Implants', desc: 'Permanent solutions for missing teeth.' },
                            { title: 'Root Canals', desc: 'Painless endodontic therapy.' },
                            { title: 'Emergency Care', desc: '24/7 support for severe dental pain.' },
                        ].map((s, i) => (
                            <div key={i} className="relative overflow-hidden rounded-lg border bg-background p-2">
                                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                                    <CheckCircle2 className="h-12 w-12 text-primary opacity-75" />
                                    <div className="space-y-2">
                                        <h3 className="font-bold">{s.title}</h3>
                                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="border-t py-12 md:py-16 mt-16 mt-auto">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex gap-2 items-center text-lg font-bold text-primary">
                            <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-serif">A</span>
                            Aurora Dental Clinic
                        </div>
                        <p className="text-sm text-muted-foreground">© 2026 Aurora Medical Group. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1800-SMILE-NOW</span>
                        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Health Ave, NY</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
