import React from 'react';
import Card from '../components/ui/Card';

/**
 * FeaturesPage
 * Showcases the grandiose features of the app (like dark mode, activity rings).
 */
const FeaturesPage = () => {
    return (
        <div className="features-page">
            <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
                    Everything You Need to <br/><span className="text-gradient">Care for Your Pet</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 60px' }}>
                    PetCare Pro offers a comprehensive suite of premium tools designed to make pet management effortless, interactive, and beautifully visual.
                </p>

                <div className="pet-grid">
                    <Card hoverEffect={true} className="stagger-1" style={{ padding: '40px' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🌙</div>
                        <h3>Dark Mode</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                            Because your eyes deserve as much care as your pets. Seamlessly toggle between our bespoke light and dark themes.
                        </p>
                    </Card>
                    <Card hoverEffect={true} className="stagger-2" style={{ padding: '40px' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>⭕</div>
                        <h3>Activity Rings</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                            Visualize your pet's daily care routines with beautiful, SVG-animated circular progress indicators.
                        </p>
                    </Card>
                    <Card hoverEffect={true} className="stagger-3" style={{ padding: '40px' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>📈</div>
                        <h3>Weight Tracker</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                            Monitor your pet's health trends over time with our custom-built, animated weight charting system.
                        </p>
                    </Card>
                    <Card hoverEffect={true} className="stagger-4" style={{ padding: '40px' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>💉</div>
                        <h3>Health Logs</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                            Keep an organized history of vaccinations, veterinary checkups, and crucial medical notes all in one secure place.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
