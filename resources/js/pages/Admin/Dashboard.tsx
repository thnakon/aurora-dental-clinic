import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout
            breadcrumbs={[
                {
                    title: 'Dashboard',
                    href: '/admin/dashboard',
                },
            ]}
        >
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border aspect-video rounded-xl border" />
                    <div className="border-sidebar-border/70 dark:border-sidebar-border aspect-video rounded-xl border" />
                    <div className="border-sidebar-border/70 dark:border-sidebar-border aspect-video rounded-xl border" />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border min-h-[100vh] flex-1 rounded-xl border md:min-h-min" />
            </div>
        </AdminLayout>
    );
}
