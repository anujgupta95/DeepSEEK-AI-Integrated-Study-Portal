import LoginButton from '@/components/LoginButton';
export default function Guest() {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', textAlign: 'center' }}>
            <p style={{ fontSize: '20px', marginRight: '10px'}}>Please login to view this page</p>
            <LoginButton />
        </div>
    )
}