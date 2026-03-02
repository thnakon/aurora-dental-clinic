import { Link } from '@inertiajs/react';
import {
    Users, Calendar, Clock, Stethoscope,
    CreditCard, Package, BarChart, Settings, LayoutGrid
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
    { title: 'Queue Today', href: '/admin/queue', icon: Clock },
    { title: 'Patients', href: '/admin/patients', icon: Users },
    { title: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { title: 'Treatments', href: '/admin/treatments', icon: Stethoscope },
    { title: 'Billing', href: '/admin/billing', icon: CreditCard },
    { title: 'Inventory', href: '/admin/inventory', icon: Package },
    { title: 'Reports', href: '/admin/reports', icon: BarChart },
    { title: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
