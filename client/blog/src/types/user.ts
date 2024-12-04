export interface User{
	id: number,
	first_name: string,
	last_name: string,
	email: string,
	avatar: Avatar,
	role: string,
	status: true,
	created_at: string,
	updated_at: string,
}

export interface Avatar{
	id: number,
	url: string,
	key: string,
	created_at: string,
}