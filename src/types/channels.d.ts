interface Channel {
    name: string,
    description: string,
    is_private: boolean,
    id: number,
    lounge_id: number,
    created_at: Date,
    created_by: number,
    member_count: number
}