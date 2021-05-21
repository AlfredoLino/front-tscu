import React from 'react';

interface InformeInterface{
    photo : string,
    date : string,
    content: string
}

const Informe : React.FC<InformeInterface> = ({photo, date, content}) : JSX.Element => {
    return (
        <article className="informe">
            <div className="content-informe">
                <header className="header-informe">
                    <div className="photo-name-bitacora">
                        <span>
                            <img className="photo-informe" src={photo} alt="Foto de perfil" />
                        </span>
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
                    {content}
                </section>
            </div>
        </article>
    );
}

export default Informe;
