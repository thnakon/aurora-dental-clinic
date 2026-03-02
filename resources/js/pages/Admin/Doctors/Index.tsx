import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Edit2 } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Doctor {
    id: number;
    specialization: string;
    license_no: string;
    user: User;
}

interface IndexProps {
    doctors: {
        data: Doctor[];
        links: any[];
    };
}

export default function Index({ doctors }: IndexProps) {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Doctors', href: '/admin/doctors' }]}>
            <Head title="Manage Doctors" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold tracking-tight">Doctors Directory</h2>
                    <Button asChild>
                        <Link href="/admin/doctors/create">
                            <UserPlus className="mr-2 h-4 w-4" /> Add Doctor
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="bg-muted/50 py-3">
                        <CardTitle className="text-sm font-medium">Practicing Doctors</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>License #</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Specialization</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {doctors.data.length > 0 ? (
                                    doctors.data.map((doctor) => (
                                        <TableRow key={doctor.id}>
                                            <TableCell className="font-medium">{doctor.license_no}</TableCell>
                                            <TableCell>{doctor.user.name}</TableCell>
                                            <TableCell>{doctor.specialization}</TableCell>
                                            <TableCell>{doctor.user.email}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={`/admin/doctors/${doctor.id}/edit`}>
                                                        <Edit2 className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">
                                            No doctors found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
