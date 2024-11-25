declare module 'netlify-identity-widget' {
  export interface User {
    id: string
    email: string
    user_metadata: {
      full_name?: string
      avatar_url?: string
    }
    app_metadata: {
      provider: string
      roles: string[]
    }
    created_at: string
    confirmed_at: string
    confirmation_sent_at: string
    updated_at: string
    aud: string
    role: string
    email_confirmed: boolean
  }

  export function init(options?: { APIUrl?: string }): void
  export function open(tab?: 'login' | 'signup'): void
  export function close(): void
  export function logout(): void
  export function refresh(): Promise<string>
  export function currentUser(): User | null
  export function on(event: string, callback: (user?: User) => void): void
  export function off(event: string, callback: (user?: User) => void): void
} 