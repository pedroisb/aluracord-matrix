
import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';



function Title({ tag, children }) {

    // o || assegura o 'h1' como valor default
    const Tag = tag || 'h1';

    return (
        <>
            <Tag>{children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    // lembre de stringar o valor da cor, ou apresentará erro

                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    )
}


export default function PaginaInicial() {
    
    const [username, setUsername] = React.useState('');
    const routing = useRouter();


    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (eventInfo) {
                            eventInfo.preventDefault();

                            // window.location.href = '/chat';
                            // forma "clássica" de criar rota, todavia faz com que a página recarregue seu conteúdo

                            routing.push(`/chat?username=${username}`);
                            // navegação na web é como uma pilha, semelhante a um array
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Boas vindas de volta!</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/* 
                        <input 
                            type="text" 
                            value={username}
                            onChange={function (event) {
                                console.log("usuário digitou", event.target.value);
                                // onde está o valor?
                                const valor = event.target.value;
                                // setar o valor da variável via React
                                setUsername(valor);
                            }}
                        /> */}

                        <TextField
                            value={username}
                            onChange={function (event) {
                                console.log("usuário digitou", event.target.value);
                                // onde está o valor?
                                const valor = event.target.value;
                                // setar o valor da variável via React
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />

                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        {/* ao acrescentar .png ao final do link do perfil de qualquer pessoa no github, se obtém a foto do perfil */}
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}



// style jsx permite estilizar componente em qual se insere e somente ele. frise-se, a aplicação do style jsx se restringe ao escopo do componente no qual se encontra

// é possível definir tag como um dos atributos do componente, permitindo alterar a tag a ser renderizada via props

// cria-se a tag GlobalStyle (o nome é fruto de convenção) para aplicar estilos de forma global, no caso, o reset do estilo

// app fit height: ajustes de estilo para que conteúdo ocupe toda a altura da página