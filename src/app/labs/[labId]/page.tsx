'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MinecraftCard from '@/components/MinecraftCard';
import { useUser } from '@/context/UserContext';

interface Product {
    id: string;
    name: string;
    icon: string;
}

interface Lab {
    labId: string;
    labName: string;
    products: Product[];
}

async function getLabData(labId: string): Promise<Lab | null> {
    try {
        const response = await fetch('/api/labs');
        if (!response.ok) {
            throw new Error('Failed to fetch labs');
        }
        const labs: Lab[] = await response.json();
        return labs.find((l) => l.labId === labId) || null;
    } catch (error) {
        console.error('Error fetching lab data:', error);
        return null;
    }
}

export default function LabProductsPage() {
    const params = useParams(); // Correct way to get params
    const { user } = useUser(); // Get the current user
    const labId = params.labId as string;

    const [lab, setLab] = useState<Lab | null>(null);
    const [submittedIds, setSubmittedIds] = useState<string[]>([]);

    useEffect(() => {
        // Only run this logic if we have a user
        if (user) {
            // Create the unique key using the user's email
            const userStorageKey = `submittedFeedback_${user.email}`;
            // Load submitted feedback for THIS user from localStorage
            const storedSubmissions = JSON.parse(localStorage.getItem(userStorageKey) || '[]');
            setSubmittedIds(storedSubmissions);
        }

        // Fetch lab data from MongoDB
        getLabData(labId).then((data) => {
            setLab(data);
        });
    }, [labId, user]); // Rerun when the labId or user changes

    if (!lab) {
        return <main style={{ textAlign: 'center', padding: '4rem' }}><h1>Loading Lab...</h1></main>;
    }

    return (
        <main style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>{lab.labName}</h1>
                <p style={{ color: '#a0a0a0' }}>Click a product to give feedback!</p>
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
