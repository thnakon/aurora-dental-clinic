import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Edit({ patient }: { patient: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: patient.user.name,
        email: patient.user.email,
        phone: patient.phone || '',
        hn: patient.hn,
        dob: patient.dob || '',
        address: patient.address || '',
        blood_type: patient.blood_type || '',
        allergy: patient.allergy || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/patients/${patient.id}`);
    };

    return (
        <AdminLayout breadcrumbs={[{ title: 'Patients', href: '/admin/patients' }, { title: 'Edit', href: `/admin/patients/${patient.id}/edit` }]}>
            <Head title="Edit Patient" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6 shadow-sm">
                <Card className="max-w-2xl mx-auto w-full">
                    <CardHeader>
                        <CardTitle>Edit Patient Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hn">HN (Hospital Number)</Label>
                                    <Input id="hn" value={data.hn} onChange={(e) => setData('hn', e.target.value)} />
                                    {errors.hn && <p className="text-sm text-destructive">{errors.hn}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input id="dob" type="date" value={data.dob} onChange={(e) => setData('dob', e.target.value)} />
                                    {errors.dob && <p className="text-sm text-destructive">{errors.dob}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="blood_type">Blood Type</Label>
                                    <Input id="blood_type" value={data.blood_type} onChange={(e) => setData('blood_type', e.target.value)} />
                                    {errors.blood_type && <p className="text-sm text-destructive">{errors.blood_type}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="allergy">Allergies</Label>
                                <Textarea id="allergy" value={data.allergy} onChange={(e) => setData('allergy', e.target.value)} />
                                {errors.allergy && <p className="text-sm text-destructive">{errors.allergy}</p>}
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" type="button" asChild>
                                    <Link href="/admin/patients">Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>Update Patient</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
