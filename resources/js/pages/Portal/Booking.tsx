import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PortalLayout from '@/layouts/portal-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { CalendarIcon, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function BookingWizard({ services, doctors }: any) {
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        service_id: '',
        doctor_id: '',
        datetime: '',
        note: '',
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/portal/booking');
    };

    return (
        <PortalLayout breadcrumbs={[{ title: 'Book Appointment', href: '/portal/booking' }]}>
            <Head title="Book Appointment" />

            <div className="flex h-full flex-1 flex-col items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-3xl mb-8 flex justify-between items-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10 -translate-y-1/2 rounded-full"></div>
                    <div className={`absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all`} style={{ width: `${(step - 1) * 33.3}%` }}></div>

                    {[1, 2, 3, 4].map(num => (
                        <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-background
                            ${step >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            {step > num ? <CheckCircle2 className="w-6 h-6" /> : num}
                        </div>
                    ))}
                </div>

                <Card className="w-full max-w-3xl shadow-lg border-2">
                    <form onSubmit={submit}>
                        <CardHeader className="bg-muted/30 border-b">
                            <CardTitle className="text-2xl">
                                {step === 1 && "Select Service"}
                                {step === 2 && "Choose a Doctor"}
                                {step === 3 && "Pick Date & Time"}
                                {step === 4 && "Confirm Details"}
                            </CardTitle>
                            <CardDescription>
                                {step === 1 && "What do you need help with today?"}
                                {step === 2 && "Select your preferred specialist."}
                                {step === 3 && "When would you like to come in?"}
                                {step === 4 && "Review your appointment."}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-6 min-h-[350px]">
                            {step === 1 && (
                                <RadioGroup value={data.service_id.toString()} onValueChange={(v: string) => setData('service_id', v)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {services.map((srv: any) => (
                                        <div key={srv.id} className={`flex items-start space-x-3 border p-4 rounded-xl cursor-pointer hover:border-primary transition-colors ${data.service_id == srv.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : ''}`} onClick={() => setData('service_id', srv.id)}>
                                            <RadioGroupItem value={srv.id.toString()} id={`srv-${srv.id}`} className="mt-1" />
                                            <div className="flex-1">
                                                <Label htmlFor={`srv-${srv.id}`} className="text-base font-semibold cursor-pointer">{srv.name}</Label>
                                                <p className="text-sm text-muted-foreground mt-1">฿{parseFloat(srv.price).toLocaleString()} • {srv.duration_minutes} mins</p>
                                            </div>
                                        </div>
                                    ))}
                                    {errors.service_id && <p className="text-destructive col-span-2">{errors.service_id}</p>}
                                </RadioGroup>
                            )}

                            {step === 2 && (
                                <RadioGroup value={data.doctor_id.toString()} onValueChange={(v: string) => setData('doctor_id', v)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {doctors.map((doc: any) => (
                                        <div key={doc.id} className={`flex items-center space-x-4 border p-4 rounded-xl cursor-pointer hover:border-primary transition-colors ${data.doctor_id == doc.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : ''}`} onClick={() => setData('doctor_id', doc.id)}>
                                            <RadioGroupItem value={doc.id.toString()} id={`doc-${doc.id}`} />
                                            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">Dr.</div>
                                            <div className="flex-1">
                                                <Label htmlFor={`doc-${doc.id}`} className="text-base font-semibold cursor-pointer">{doc.user.name}</Label>
                                                <p className="text-sm text-muted-foreground">{doc.specialization}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {errors.doctor_id && <p className="text-destructive col-span-2">{errors.doctor_id}</p>}
                                </RadioGroup>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 max-w-md mx-auto">
                                    <div className="space-y-2">
                                        <Label htmlFor="datetime" className="font-semibold flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4" /> Selected Date & Time
                                        </Label>
                                        <Input
                                            type="datetime-local"
                                            id="datetime"
                                            value={data.datetime}
                                            onChange={e => setData('datetime', e.target.value)}
                                            className="h-12 text-lg"
                                        />
                                        <p className="text-xs text-muted-foreground">Select a future date during clinic hours (9:00 AM - 6:00 PM).</p>
                                        {errors.datetime && <p className="text-destructive">{errors.datetime}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="note" className="font-semibold">Additional Notes (Optional)</Label>
                                        <Textarea
                                            id="note"
                                            placeholder="Symptoms, requests, or questions..."
                                            value={data.note}
                                            onChange={e => setData('note', e.target.value)}
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="bg-muted/40 p-6 rounded-xl border space-y-4">
                                    <div className="grid grid-cols-3 gap-4 border-b pb-4">
                                        <div className="text-muted-foreground font-semibold">Service</div>
                                        <div className="col-span-2 font-medium">{services.find((s: any) => s.id == data.service_id)?.name}</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 border-b pb-4">
                                        <div className="text-muted-foreground font-semibold">Doctor</div>
                                        <div className="col-span-2 font-medium">{doctors.find((d: any) => d.id == data.doctor_id)?.user.name}</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 border-b pb-4">
                                        <div className="text-muted-foreground font-semibold">Date & Time</div>
                                        <div className="col-span-2 font-medium">{new Date(data.datetime).toLocaleString()}</div>
                                    </div>
                                    {data.note && (
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-muted-foreground font-semibold">Notes</div>
                                            <div className="col-span-2 italic text-sm">{data.note}</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex justify-between border-t p-6 bg-muted/10">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className="w-28">
                                <ChevronLeft className="mr-2 h-4 w-4" /> Back
                            </Button>

                            {step < 4 ? (
                                <Button type="button" onClick={nextStep} disabled={(step === 1 && !data.service_id) || (step === 2 && !data.doctor_id) || (step === 3 && !data.datetime)} className="w-28 shadow-md">
                                    Next <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button type="submit" disabled={processing} className="w-36 shadow-md bg-green-600 hover:bg-green-700">
                                    Confirm Booking
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </PortalLayout>
    );
}
