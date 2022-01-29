import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQwNjIwNCwiZXhwIjoxOTU4OTgyMjA0fQ.qKJguqF2mAEWePcKrlAqjDXcLoMKKM1vPtGQOhy7lDY';
const SUPABASE_URL = 'https://lugyeeobzfcttiaaugwu.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



export default function ChatPage() {

    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    // o useEffect é um recurso disponibilizado pelo React para tratar os efeitos colaterais do componente, ou seja, tudo aquilo que fuja ao fluxo padrão do componente
    React.useEffect(() => {
        supabaseClient
            .from('messages')
            .select('*')
            .then(({ data }) => {
                console.log('Dados da consuta:', data);
                setMessageList(data);
            });
    }, []);

    function handleNewMessage(newMessage) {

        const message = {
            //id: messageList.length + 1, // +1 para evitar id=0
            from: 'vanessametonini',
            // posso substituir por uma variável com o nome de usuário. a ver como seria, pos acredito que ela está aqui como destinatária e não como emitente (no caso, este seria o usuárioq que fez o login)
            text: newMessage
        }
        // lembre-se que cada elemento mensagem não se resume ao texto, em si, mas uma conjunto de informações que também incluem usuário que a enviou, hora de envio etc

        supabaseClient
            .from('messages')
            .insert([
                message
            ])
            .then(({ data }) => {
                console.log("Criando mensagem: ", messageResponse);
                setMessageList([
                    data[0],
                    ...messageList
                ]);
            });

        setMessage('');
    }
    // foi necessário por message antes de ...messageList para que a última mensagem a ser exibida na tela fosse a mais recente e não a mais antiga
    // isso se deu em razão do css ter setado o scroll para rolar de forma invertida - de baixo para cima

    return (

        // há uma repetição de parte da estrutura presente na Home
        // poderia ser interessante identificar e separar em uma pasta de componentes, sendo apenas chamados na página
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* messages={[]} */}
                    <MessageList messages={messageList} />
                    {/* {messageList.map((presentMessage) => {
                        return (
                            //insert key
                            <li key={presentMessage.id}>
                                {presentMessage.from}: {presentMessage.text}
                            </li>
                        )
                    })} */}


                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}

                            onChange={(event) => {
                                setMessage(event.target.value);
                            }}

                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {

                                    event.preventDefault();
                                    // este event está ligado ao enter, o prevent default evita que o enter cause uma quebra de linha

                                    handleNewMessage(message);
                                }
                                //nesta etapa, não está sendo armazenada a mensagem e ainda está pulando uma linha após enter

                                //code or key "Enter"
                                //keyCode está depreciado
                            }}

                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}


function MessageList({ messages }) {

    return (

        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                // auto para aparecer apenas quando necessário
                // outra possibilidade seria usar webkit para remover scrollbar
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {messages.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            //lembre de alterar aqui também no endereço quando substituir o user que está emitindo a mensagem para pegar a foto correta
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {message.text}
                    </Text>
                )
            })}
        </Box>
    )
}