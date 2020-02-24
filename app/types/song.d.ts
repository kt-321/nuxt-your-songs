export interface ISong {
    id: number
    user_id: number
    title: string
    artist_name: string
    music_age: number
    description: string | null
    image_url: string | null
    video_url: string | null
    created_at: string
    updated_at: string
    deleted_at: string | null
}