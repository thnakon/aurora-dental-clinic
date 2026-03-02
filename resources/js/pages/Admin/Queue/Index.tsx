import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2, PlayCircle, CheckCircle, SkipForward } from 'lucide-react';

export default function QueueBoard({ queues }: any) {
    const updateStatus = (id: number, status: string) => {
        router.put(`/admin/queue/${id}`, { status });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'waiting': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
            case 'calling': return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 animate-pulse';
            case 'in_room': return 'bg-purple-500/20 text-purple-700 dark:text-purple-400';
            case 'done': return 'bg-green-500/20 text-green-700 dark:text-green-400';
            case 'skipped': return 'bg-red-500/20 text-red-700 dark:text-red-400';
            default: return 'bg-gray-500/20 text-gray-700';
        }
    };

    return (
        <AdminLayout breadcrumbs={[{ title: 'Queue Board', href: '/admin/queue' }]}>
            <Head title="Live Queue Board" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold tracking-tight">Today's Queue Overview</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Active/Calling Screen */}
                    <div className="col-span-1 md:col-span-3 lg:col-span-1 space-y-4">
                        <Card className="border-4 border-primary shadow-xl">
                            <CardHeader className="bg-primary/5 pb-4">
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Volume2 className="h-5 w-5 animate-pulse" />
                                    Now Calling
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {queues.filter((q: any) => q.status === 'calling').map((q: any) => (
                                    <div key={q.id} className="text-center space-y-4 mb-6">
                                        <div className="text-6xl font-black text-primary tracking-tighter">
                                            {q.queue_number}
                                        </div>
                                        <div className="text-xl font-medium">
                                            {q.appointment.patient.user.name}
                                        </div>
                                        <div className="text-muted-foreground">
                                            Dr. {q.appointment.doctor.user.name}
                                        </div>
                                        <div className="flex justify-center gap-2 pt-4">
                                            <Button onClick={() => updateStatus(q.id, 'in_room')} variant="default" className="w-full">
                                                <PlayCircle className="mr-2 h-4 w-4" /> Move to Room
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {queues.filter((q: any) => q.status === 'calling').length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No patient is currently being called.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Waiting List */}
                    <div className="col-span-1 md:col-span-3 lg:col-span-2">
                        <Card className="h-full">
                            <CardHeader className="border-b bg-muted/20">
                                <CardTitle>Queue Management</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y relative">
                                    {queues.length > 0 ? queues.map((q: any) => (
                                        <div key={q.id} className={`flex items-center justify-between p-4 hover:bg-muted/10 transition-colors ${q.status === 'done' ? 'opacity-50' : ''}`}>
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-2xl font-bold">
                                                    {q.queue_number}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg">{q.appointment.patient.user.name}</h4>
                                                    <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                                                        <span>{q.appointment.service.name}</span>
                                                        <span>•</span>
                                                        <span>Dr. {q.appointment.doctor.user.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant="outline" className={`px-3 py-1 text-sm uppercase ${getStatusColor(q.status)} border-0`}>
                                                    {q.status.replace('_', ' ')}
                                                </Badge>

                                                <div className="flex gap-2">
                                                    {q.status === 'waiting' && (
                                                        <>
                                                            <Button size="sm" onClick={() => updateStatus(q.id, 'calling')}>
                                                                Call
                                                            </Button>
                                                            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => updateStatus(q.id, 'skipped')}>
                                                                <SkipForward className="h-4 w-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                    {q.status === 'in_room' && (
                                                        <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => updateStatus(q.id, 'done')}>
                                                            <CheckCircle className="mr-2 h-4 w-4" /> Complete
                                                        </Button>
                                                    )}
                                                    {q.status === 'skipped' && (
                                                        <Button size="sm" variant="outline" onClick={() => updateStatus(q.id, 'waiting')}>
                                                            Requeue
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="p-8 text-center text-muted-foreground">
                                            No appointments scheduled for today.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
