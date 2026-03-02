import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Edit2, Trash2 } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Patient {
    id: number;
    hn: string;
    phone: string;
    dob: string;
    user: User;
}

interface IndexProps {
    patients: {
        data: Patient[];
        links: any[];
    };
}

export default function Index({ patients }: IndexProps) {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Patients', href: '/admin/patients' }]}>
            <Head title="Manage Patients" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold tracking-tight">Patients Directory</h2>
                    <Button asChild>
                        <Link href="/admin/patients/create">
                            <UserPlus className="mr-2 h-4 w-4" /> Add Patient
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="bg-muted/50 py-3">
                        <CardTitle className="text-sm font-medium">Registered Patients</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>HN</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patients.data.length > 0 ? (
                                    patients.data.map((patient) => (
                                        <TableRow key={patient.id}>
                                            <TableCell className="font-medium">{patient.hn}</TableCell>
                                            <TableCell>{patient.user.name}</TableCell>
                                            <TableCell>{patient.user.email}</TableCell>
                                            <TableCell>{patient.phone || '-'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="icon" asChild>
                                                        <Link href={`/admin/patients/${patient.id}/edit`}>
                                                            <Edit2 className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">
                                            No patients found.
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
