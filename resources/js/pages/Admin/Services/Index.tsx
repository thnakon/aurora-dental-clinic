import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2 } from 'lucide-react';

interface Service {
    id: number;
    name: string;
    price: string;
    duration_minutes: number;
    category: string;
    is_active: boolean;
}

interface IndexProps {
    services: {
        data: Service[];
        links: any[];
    };
}

export default function Index({ services }: IndexProps) {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Services', href: '/admin/services' }]}>
            <Head title="Manage Services" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold tracking-tight">Services Catalog</h2>
                    <Button asChild>
                        <Link href="/admin/services/create">
                            <Plus className="mr-2 h-4 w-4" /> Add Service
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="bg-muted/50 py-3">
                        <CardTitle className="text-sm font-medium">Available Dental Services</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price (THB)</TableHead>
                                    <TableHead>Duration (mins)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {services.data.length > 0 ? (
                                    services.data.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell className="font-medium">{service.name}</TableCell>
                                            <TableCell>{service.category}</TableCell>
                                            <TableCell>฿{parseFloat(service.price).toLocaleString()}</TableCell>
                                            <TableCell>{service.duration_minutes} mins</TableCell>
                                            <TableCell>{service.is_active ? 'Active' : 'Inactive'}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={`/admin/services/${service.id}/edit`}>
                                                        <Edit2 className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center h-24">
                                            No services found.
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
