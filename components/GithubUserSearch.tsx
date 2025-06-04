import { useState } from 'react';
export default function GithubUserSearch({ onSearch }: { onSearch: (username: string) => void }) {
    console.log("github user search got called from the github user search")
    
    const [username, setUsername] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onSearch(username);
        }
    };
    console.log("username from the github user search = ",username)
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="px-4 py-2 border rounded"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
                Search
            </button>
        </form>
    );
}