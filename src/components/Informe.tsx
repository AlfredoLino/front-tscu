import React from 'react';

interface InformeInterface{
    photo : string,
    date : string,
}

const Informe : React.FC<InformeInterface> = ({photo, date}) : JSX.Element => {
    return (
        <article className="informe">
            <div className="content-informe">
                <header className="header-informe">
                    <div className="photo-name-bitacora">
                        <img className="photo-informe" src={photo} alt="Foto de perfil" />
                        <h2>
                            {localStorage.getItem("nombre")}
                        </h2>
                    </div>
                    <div className="data-informe" >
                        <div className="email-bitacora">
                            {localStorage.getItem("email")}
                        </div>
                        <div className="date-informe">
                            {date}
                        </div>
                    </div>
                </header>
                <section className="text-informe">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada lacinia placerat. Quisque venenatis hendrerit sem, quis sagittis metus varius sed. Nunc consequat condimentum tellus sit amet gravida. Sed mi ex, mollis sit amet turpis posuere, condimentum sollicitudin ex. Donec eu tortor dignissim, semper magna vitae, rutrum metus. Vivamus ac mi volutpat, venenatis dolor et, mollis ante. Maecenas laoreet mi mi, at interdum turpis egestas ut. Nulla id placerat nunc. Vivamus vitae fermentum dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </section>
            </div>
        </article>
    );
}

export default Informe;
