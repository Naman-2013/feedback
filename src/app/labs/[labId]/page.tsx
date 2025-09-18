'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MinecraftCard from '@/components/MinecraftCard';
import { useUser } from '@/context/UserContext';

// This data is hardcoded for the client-side component
const db = {
    "labs": [
        {
          "labId": "a",
          "labName": "Lab A - Robotics & AI",
          "products": [
            { "id": "a1", "name": "AI Art Generator", "icon": "🎨" },
            { "id": "a2", "name": "Self-Driving Rover", "icon": "🚗" },
            { "id": "a3", "name": "Chess Bot", "icon": "♟️" },
            { "id": "a4", "name": "Automated Gardener", "icon": "🌱" },
            { "id": "a5", "name": "Voice Assistant", "icon": "💬" },
            { "id": "a6", "name": "Robotic Arm", "icon": "🦾" },
            { "id": "a7", "name": "Pathfinding AI", "icon": "🗺️" }
          ]
        },
        {
          "labId": "b",
          "labName": "Lab B - VR/AR Experiences",
          "products": [
            { "id": "b1", "name": "VR Space Explorer", "icon": "🚀" },
            { "id": "b2", "name": "AR Furniture Placer", "icon": "🛋️" },
            { "id": "b3", "name": "Virtual Museum Tour", "icon": "🏛️" },
            { "id": "b4", "name": "VR Fitness Game", "icon": "💪" },
            { "id": "b5", "name": "Augmented Reality Art", "icon": "🖼️" },
            { "id": "b6", "name": "Shared VR Workspace", "icon": "🤝" },
            { "id": "b7", "name": "VR Escape Room", "icon": "🧩" }
          ]
        },
        {
          "labId": "c",
          "labName": "Lab C - IoT & Smart Devices",
          "products": [
            { "id": "c1", "name": "Smart Home Hub", "icon": "💡" },
            { "id": "c2", "name": "Weather Station", "icon": "🌦️" },
            { "id": "c3", "name": "Pet Feeder", "icon": "🐾" },
            { "id": "c4", "name": "Smart Security Cam", "icon": "📹" },
            { "id": "c5", "name": "Health Monitor", "icon": "❤️‍🩹" },
            { "id": "c6", "name": "Smart Mirror", "icon": "🪞" },
            { "id": "c7", "name": "Connected Bike Lock", "icon": "🚲" }
          ]
        },
        {
          "labId": "d",
          "labName": "Lab D - Web & Blockchain",
          "products": [
            { "id": "d1", "name": "Decentralized Voting", "icon": "🔗" },
            { "id": "d2", "name": "NFT Art Marketplace", "icon": "💎" },
            { "id": "d3", "name": "Real-time Chat App", "icon": "💬" },
            { "id": "d4", "name": "Supply Chain Tracker", "icon": "⛓️" },
            { "id": "d5", "name": "Live Polling System", "icon": "📊" },
            { "id": "d6", "name": "Encrypted File Share", "icon": "📁" },
            { "id": "d7", "name": "Web Game Engine", "icon": "🎮" }
          ]
        }
    ]
};

function getLabData(labId: string) {
    return db.labs.find((l) => l.labId === labId);
}

export default function LabProductsPage() {
    const params = useParams();
    const { user } = useUser();
    const labId = params.labId as string;

    const [lab, setLab] = useState<any>(null);
    const [submittedIds, setSubmittedIds] = useState<string[]>([]);

    useEffect(() => {
        if (user) {
            const userStorageKey = `submittedFeedback_${user.email}`;
            const storedSubmissions = JSON.parse(localStorage.getItem(userStorageKey) || '[]');
            setSubmittedIds(storedSubmissions);
        }
        const data = getLabData(labId);
        setLab(data);
    }, [labId, user]);

    const backButtonStyle: React.CSSProperties = {
        display: 'inline-block',
        padding: '0.75rem 1.5rem',
        marginTop: '1rem',
        backgroundColor: '#7d7d7d',
        border: '4px solid',
        borderColor: '#c6c6c6 #585858 #585858 #c6c6c6',
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'transform 0.2s',
        fontFamily: 'var(--font-minecraft), monospace'
      };

    if (!lab) {
        return <main style={{ textAlign: 'center', padding: '4rem' }}><h1>Loading Lab...</h1></main>;
    }

    return (
        <main style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>{lab.labName}</h1>
                <p style={{ color: '#a0a0a0' }}>Click a product to give feedback!</p>
                <Link href="/labs" style={backButtonStyle}>
                    &lt; Back to Lab Menu
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                {lab.products.map((product: { id: string; name: string; icon: string }) => (
                    <MinecraftCard
                        key={product.id}
                        {...product}
                        isSubmitted={submittedIds.includes(product.id)}
                    />
                ))}
            </div>
        </main>
    );
}

