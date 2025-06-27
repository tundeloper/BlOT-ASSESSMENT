interface Lounge {
    name: string;
    description: string;
    icon: string;
    id: number;
    slug: string;
    created_at: string;
    created_by: number;
    member_count: number;
    is_member: boolean;
}

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    hasSubmenu?: boolean;
    isSelected?: boolean;
    path: string
}