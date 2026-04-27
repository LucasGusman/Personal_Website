// neuralNetwork.js
// Single Source of Truth for the Artificial Brain's UI and data clustering.

export const hubs = [
    {
        id: '1',
        name: 'ATHLETICS',
        x: 180, y: 150, z: -100, // Top-Right-Front Brain
        color: 0x3b82f6, // Vibrant Blue
        cssColor: 'rgba(59, 130, 246, 0.8)',
        categories: [
            {
                name: 'Sports',
                items: [
                    'Lacrosse', 'Indoor Volleyball', 'Sand Volleyball', 
                    'Dodgeball', 'Rock Climbing', 'Paintball', 'Ultimate Frisbee'
                ]
            },
            {
                name: 'Racing',
                items: [
                    'Kart Racing', 'F1', 'Driving Simulators'
                ]
            }
        ]
    },
    {
        id: '2',
        name: 'TACTICS',
        x: -150, y: 100, z: -50, // Top-Left-Mid Brain
        color: 0x10b981, // Emerald Green
        cssColor: 'rgba(16, 185, 129, 0.8)',
        categories: [
            {
                name: 'Games',
                items: [
                    'Poker', 
                    { name: 'Chess', note: 'Always up for a game!' }, 
                    { name: 'Magic the Gathering', note: 'Pre-release is the best' }, 
                    'Board games in general'
                ]
            },
            {
                name: 'Puzzles',
                items: [
                    'Escape Rooms', 'Logic Puzzles', 'Wooden / Metal Puzzles'
                ]
            }
        ]
    },
    {
        id: '3',
        name: 'CINEMA',
        x: 0, y: 40, z: -200, // Front Center Lobe (Raised to clear the brow geometry)
        color: 0x8b5cf6, // Violet
        cssColor: 'rgba(139, 92, 246, 0.8)',
        categories: [
            {
                name: 'Movies',
                items: [
                    { name: 'Tenet', note: 'Easily my favorite movie' }, 
                    'Inception', 'Interstellar', 'Christopher Nolan',
                    'Book of Eli', 'Gladiator', 'Shutter Island', 'Deja Vu'
                ]
            },
            {
                name: 'Franchises',
                items: [
                    'Star Wars', 'Marvel', 'Lord of the Rings'
                ]
            }
        ]
    },
    {
        id: '4',
        name: 'INTERACTIVE',
        x: -160, y: -60, z: 120, // Bottom-Left-Back Brain (Raised)
        color: 0xf59e0b, // Amber
        cssColor: 'rgba(245, 158, 11, 0.8)',
        categories: [
            {
                name: 'Story Driven',
                items: [
                    'Spider-Man', 'Ghost of Yōtei', 'God of War', 'The Last of Us'
                ]
            },
            {
                name: 'Co-Op',
                items: [
                    'Keep Talking and Nobody Explodes', 'It Takes Two'
                ]
            }
        ]
    },
    {
        id: '5',
        name: 'ENGINEERING',
        x: 160, y: -40, z: 150, // Bottom-Right-Back Brain (Raised)
        color: 0xef4444, // Bright Red
        cssColor: 'rgba(239, 68, 68, 0.8)',
        categories: [
            {
                name: 'Aerospace',
                items: [
                    'Space Exploration', 'Rockets'
                ]
            },
            {
                name: 'Fabrication',
                items: [
                    '3D Printing'
                ]
            }
        ]
    },
    {
        id: '6',
        name: 'LIFESTYLE',
        x: 0, y: 150, z: 150, // Top-Center-Back Brain
        color: 0x0ea5e9, // Sky Blue
        cssColor: 'rgba(14, 165, 233, 0.8)',
        categories: [
            {
                name: 'Finance',
                items: [
                    'Investing', 'Stock Market'
                ]
            },
            {
                name: 'Culture',
                items: [
                    'Traveling', 
                    { name: 'Music', note: "If I Ain't Got You is a BANGER" }
                ]
            }
        ]
    }
];

if (typeof window !== 'undefined') {
    window.USER_HUBS = hubs;
}
