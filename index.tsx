import React, { useState, CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';

// --- THEME ---
const theme = {
    primaryColor: '#FFD700', // Gold
    secondaryColor: '#FFFFFF', // White
    backgroundColor: '#000000', // Black
    font: "'Vazirmatn', sans-serif",
};

// --- STYLES ---
const styles: { [key: string]: CSSProperties } = {
    screen: {
        width: '100%',
        height: '100%',
        maxWidth: '450px', // Mobile view
        maxHeight: '900px',
        backgroundColor: theme.backgroundColor,
        color: theme.secondaryColor,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${theme.primaryColor}33`,
        borderRadius: '20px',
        boxShadow: `0 0 20px ${theme.primaryColor}22`,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: -1,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        width: '90%',
        margin: 'auto',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: `1px solid ${theme.primaryColor}`,
        borderRadius: '8px',
        padding: '15px',
        color: theme.secondaryColor,
        fontSize: '16px',
        textAlign: 'right',
        fontFamily: theme.font,
    },
    glossyGoldButton: {
        background: `linear-gradient(145deg, #FFD700, #E5C100)`,
        color: theme.backgroundColor,
        border: 'none',
        borderRadius: '25px',
        padding: '15px 30px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    errorMessage: {
        color: '#FF6B6B',
        textAlign: 'center',
        marginTop: '10px',
    }
};

// --- ICON COMPONENTS ---
const CoinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={theme.primaryColor} style={{verticalAlign: 'middle'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>;
const GemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={theme.primaryColor} style={{verticalAlign: 'middle'}}><path d="m12 1 9.5 7.5L12 23 2.5 8.5L12 1Zm0 2.31L4.5 9.5l7.5 10.19L19.5 9.5 12 3.31Z"/></svg>;
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={theme.primaryColor} style={{verticalAlign: 'middle'}}><path d="M19 4h-2V2H7v2H5c-1.1 0-2 .9-2 2v2c0 1.68.83 3.14 2.08 4.06L5 20v2h14v-2l-2.08-7.94C18.17 9.14 19 7.68 19 6V4Zm-7 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3ZM7 8V6h10v2c0 1.1-.9 2-2 2h-1.5c-.53 0-1.02.22-1.37.59C11.77 10.98 11.4 11 11 11h-2c-.4 0-.77-.02-1.13-.41-.35-.37-.84-.59-1.37-.59H5c-1.1 0-2-.9-2-2Z"/></svg>;
const StoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={theme.secondaryColor}><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zM12 11c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>;
const ChallengeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={theme.secondaryColor}><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 12H4V6h2v10h2V6h2v10h2V6h2v10h2V6h2v12z"/></svg>;
const HistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={theme.secondaryColor}><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z"/></svg>;

// --- SCREENS ---
const SignUpScreen = ({ onSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = () => {
        if (!username || !password || !confirmPassword) {
            setError('لطفاً تمام فیلدها را پر کنید.');
            return;
        }
        if (password.length < 6) {
            setError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
            return;
        }
        if (password !== confirmPassword) {
            setError('رمزهای عبور با یکدیگر مطابقت ندارند.');
            return;
        }
        setError('');
        onSignUp(username);
    };

    return (
        <div style={{...styles.screen, justifyContent: 'center'}}>
            <img src="https://cdn.imgurl.ir/uploads/s6214_InShot__.jpg" style={styles.backgroundImage} alt="Background" />
            <div style={styles.overlay}></div>
            <div style={styles.form}>
                <input style={styles.input} type="text" placeholder="نام کاربری" value={username} onChange={e => setUsername(e.target.value)} aria-label="نام کاربری" />
                <input style={styles.input} type="password" placeholder="رمز عبور" value={password} onChange={e => setPassword(e.target.value)} aria-label="رمز عبور" />
                <input style={styles.input} type="password" placeholder="تکرار رمز عبور" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} aria-label="تکرار رمز عبور" />
                <button style={styles.glossyGoldButton} onClick={handleSignUp}>ثبت‌نام</button>
                {error && <p style={styles.errorMessage}>{error}</p>}
            </div>
        </div>
    );
};

const MainMenuScreen = ({ username, avatarUrl, onNavigate }) => {
    return (
        <div style={styles.screen}>
            <img src="https://cdn.imgurl.ir/uploads/w253923_InShot__.jpg" style={styles.backgroundImage} alt="Background" />
            
            <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '15px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CoinIcon /> 1,250</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><GemIcon /> 300</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><TrophyIcon /> 45</div>
                </div>
                <div onClick={() => onNavigate('AvatarSelection')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: '10px' }}>
                    <span>{username}</span>
                    <img src={avatarUrl} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '8px', border: `2px solid ${theme.primaryColor}` }} />
                </div>
            </header>

            <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                 <button style={{...styles.glossyGoldButton, fontSize: '24px', padding: '20px 40px', borderRadius: '30px' }}>شروع بازی</button>
            </main>

            <footer style={{ padding: '10px', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: `1px solid ${theme.primaryColor}55`, zIndex: 1 }}>
                <div style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><StoreIcon /><span style={{fontSize: '12px'}}>فروشگاه</span></div>
                <div style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><ChallengeIcon /><span style={{fontSize: '12px'}}>چالش</span></div>
                <div style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><HistoryIcon /><span style={{fontSize: '12px'}}>تاریخچه</span></div>
            </footer>
        </div>
    );
};

const AvatarSelectionScreen = ({ currentAvatar, onAvatarSelect, onNavigate }) => {
    const avatars = [
        { id: "avatar_01", imageUrl: "https://cdn.imgurl.ir/uploads/f32084_IMG_20250827_144709_907.jpg" },
        { id: "avatar_02", imageUrl: "https://cdn.imgurl.ir/uploads/k49298_IMG_20250827_160949_096.jpg" },
        { id: "avatar_03", imageUrl: "https://cdn.imgurl.ir/uploads/m87957_IMG_20250827_164921_059.jpg" },
        { id: "avatar_04", imageUrl: "https://cdn.imgurl.ir/uploads/a519305_IMG_20250827_164946_814.jpg" },
        { id: "avatar_05", imageUrl: "https://i.pravatar.cc/150?img=5" },
        { id: "avatar_06", imageUrl: "https://i.pravatar.cc/150?img=6" },
        { id: "avatar_07", imageUrl: "https://i.pravatar.cc/150?img=7" },
        { id: "avatar_08", imageUrl: "https://i.pravatar.cc/150?img=8" },
    ];

    const handleSelect = (imageUrl) => {
        onAvatarSelect(imageUrl);
        onNavigate('MainMenu');
    };

    return (
        <div style={styles.screen}>
            <img src="https://cdn.imgurl.ir/uploads/s6214_InShot__.jpg" style={styles.backgroundImage} alt="Background" />
            <div style={{...styles.overlay, backdropFilter: 'blur(5px)'}}></div>
            
            <header style={{padding: '20px', textAlign: 'center', position: 'relative', zIndex: 1}}>
                 <button onClick={() => onNavigate('MainMenu')} style={{position: 'absolute', right: '20px', background: 'none', border: 'none', color: theme.secondaryColor, fontSize: '28px', cursor: 'pointer', top: '50%', transform: 'translateY(-50%)'}} aria-label="بازگشت">&#x2192;</button>
                 <h1 style={{margin: 0, fontSize: '24px'}}>انتخاب آواتار</h1>
            </header>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', zIndex: 1 }}>
                {avatars.map(avatar => (
                    <div key={avatar.id} onClick={() => handleSelect(avatar.imageUrl)} style={{
                        position: 'relative',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: avatar.imageUrl === currentAvatar ? `3px solid ${theme.primaryColor}` : '3px solid transparent',
                        aspectRatio: '1 / 1',
                        transition: 'border-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img src={avatar.imageUrl} alt={avatar.id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {avatar.imageUrl === currentAvatar && (
                            <div style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(255, 215, 0, 0.8)', color: 'black', textAlign: 'center', padding: '2px', fontSize: '12px' }}>
                                فعال
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- APP CONTAINER ---
const App = () => {
    const [screen, setScreen] = useState('SignUp'); // 'SignUp', 'MainMenu', 'AvatarSelection'
    const [username, setUsername] = useState('نام کاربر');
    const [avatarUrl, setAvatarUrl] = useState('https://cdn.imgurl.ir/uploads/f32084_IMG_20250827_144709_907.jpg');

    const handleSignUp = (newUsername) => {
        setUsername(newUsername);
        setScreen('MainMenu');
    };

    const renderScreen = () => {
        switch (screen) {
            case 'MainMenu':
                return <MainMenuScreen username={username} avatarUrl={avatarUrl} onNavigate={setScreen} />;
            case 'AvatarSelection':
                return <AvatarSelectionScreen currentAvatar={avatarUrl} onAvatarSelect={setAvatarUrl} onNavigate={setScreen} />;
            case 'SignUp':
            default:
                return <SignUpScreen onSignUp={handleSignUp} />;
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            {renderScreen()}
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<React.StrictMode><App /></React.StrictMode>);
}
