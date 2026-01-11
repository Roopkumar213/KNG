const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/api`;
const ADMIN_URL = `${BASE_URL}/admin`;

export const api = {
    // Heritage Data (Static for now, could be API)
    getHeritage: async () => {
        return [
            {
                id: 1,
                title: "Kangundi Fort",
                description: "A 11th-century fortress standing as a sentinel over the valley.",
                image: "/images/gallery/fortwalk.png",
                category: "History"
            },
            {
                id: 2,
                title: "Shiva Temple",
                description: "Perched on a granite tor, this ancient temple comes alive during Shivratri.",
                image: "/images/gallery/temple.png",
                category: "Culture"
            },
            {
                id: 3,
                title: "Heritage Street",
                description: "A living canvas of murals celebrating local legends and zameendari legacy.",
                image: "/images/gallery/heritagestreet.png",
                category: "Art & Culture"
            }
        ];
    },

    getExperiences: async () => {
        return [
            { id: 1, title: "Fort Hill Trek", description: "Moderate 2-hour climb.", duration: "3 Hours", season: "Oct - Feb", difficulty: "Moderate", image: "/images/gallery/hillupside.png" },
            { id: 2, title: "Village Culture Walk", description: "Immersive heritage tour.", duration: "1.5 Hours", season: "All Year", difficulty: "Easy", image: "/images/gallery/HeritageStreet1.png" },
            { id: 3, title: "Bouldering Adventure", description: "Guided technical climbing.", duration: "4 Hours", season: "Nov - Feb", difficulty: "Hard", image: "/images/gallery/HillView2.png" },
        ];
    },

    getItineraries: async () => {
        return [
            {
                id: 1,
                title: "The One-Day Explorer",
                description: "Perfect for weekend travelers.",
                timeline: [
                    { time: "09:00 AM", activity: "Reach Kangundhi village and begin the hill trek to Kangundi Fort and the hilltop Shiva temple." },
                    { time: "11:00 AM", activity: "Explore fort ruins, ancient caves, and panoramic viewpoints overlooking the valley." },
                    { time: "01:00 PM", activity: "Descend carefully and have lunch in Kuppam town. Experience local cuisine." },
                    { time: "03:00 PM", activity: "Visit heritage street murals and village life scenes before departure." },
                    { time: "05:00 PM", activity: "Scenic return drive with optional stops for photography." }
                ],
                images: [
                    "/images/gallery/fortwalk.png",
                    "/images/gallery/hillupside.png",
                    "/images/gallery/temple.png"
                ]
            },
            {
                id: 2,
                title: "The Three-Day Explorer",
                description: "Deep immersion into heritage, culture, and adventure.",
                timeline: [
                    { time: "Day 1 - 10:00 AM", activity: "Arrive in Kuppam, check in to accommodation. Explore local markets and nearby temples." },
                    { time: "Day 1 - 02:00 PM", activity: "Afternoon visit to heritage sites and preparation for the next day's trek." },
                    { time: "Day 1 - 06:00 PM", activity: "Evening cultural experience and local dining in Kuppam." },
                    { time: "Day 2 - 06:00 AM", activity: "Early morning departure. Begin trek to Kangundi Fort and hilltop Shiva temple." },
                    { time: "Day 2 - 10:00 AM", activity: "Explore fort ruins, caves, and ancient structures. Photography session." },
                    { time: "Day 2 - 01:00 PM", activity: "Lunch break with views of the valley and surrounding granite formations." },
                    { time: "Day 2 - 03:00 PM", activity: "Bouldering session or leisure exploration of the hilltop area." },
                    { time: "Day 2 - 06:00 PM", activity: "Return to Kuppam. Evening rest and local cultural activities." },
                    { time: "Day 3 - 09:00 AM", activity: "Visit heritage street murals and village life. Interact with local community." },
                    { time: "Day 3 - 12:00 PM", activity: "Final exploration, souvenir shopping, and farewell lunch." },
                    { time: "Day 3 - 03:00 PM", activity: "Departure with lasting memories of Kangundhi's heritage and beauty." }
                ],
                images: [
                    "/images/gallery/hillview1.png",
                    "/images/gallery/temple.png",
                    "/images/gallery/fortwalk.png",
                    "/images/gallery/HillView2.png"
                ]
            }
        ];
    },

    getBoulders: async () => {
        return [
            { id: 1, name: "The Fortress", grade: "V3-V8", lat: 12.710, lng: 78.341, description: "Highballs." },
            { id: 2, name: "Riverside", grade: "V0-V4", lat: 12.712, lng: 78.344, description: "Dynamic moves." },
            { id: 3, name: "Temple Crag", grade: "V5-V10", lat: 12.709, lng: 78.339, description: "Crimps." }
        ];
    },

    // REAL BACKEND CALLS
    submitInquiry: async (data) => {
        try {
            const response = await fetch(`${API_URL}/inquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (e) {
            console.error("API Error", e);
            return { success: false };
        }
    },

    bookGuide: async (data) => {
        try {
            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (e) {
            console.error("API Error", e);
            return { success: false };
        }
    },

    // ADMIN AUTH
    login: async (email, password) => {
        try {
            const response = await fetch(`${ADMIN_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) throw new Error('Login failed');
            return await response.json(); // returns { token }
        } catch (e) {
            throw e;
        }
    },

    getAdminBookings: async (token) => {
        const response = await fetch(`${ADMIN_URL}/bookings`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
    }
};
