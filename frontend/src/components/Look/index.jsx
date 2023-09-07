// Importa el componente ProfileCard desde el archivo "./ProfileCard.js"
import ProfileCard from "./ProfileCard";

// Define el componente Look
export default function Look() {
    return (
        <div>
        <h1 style={{margin: "0 0", padding: "0 0 10px 0"}}>Tarjeta de Perfil</h1>
        <div className="container-fluid" style={{ width: "400px", background: '#999999', borderRadius: "20px", marginRight: "50px" ,padding: "0px 20px"}}>
            {/* Título de la página */}
            
            

            {/* Renderiza el componente ProfileCard */}
            <ProfileCard className="container-fluid"/>
        </div>
        </div>
    );
}

