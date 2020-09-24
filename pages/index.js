import React, { useState } from 'react';
import { Stack, Textarea, Button, Text, Alert, AlertIcon } from '@chakra-ui/core';
import { stringify } from 'querystring';

const Index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [sucess, setSucess] = useState(false);
    const [inputIsVoid, setInputIsVoid] = useState(false);
    const [inputText, setInputText] = useState('Tao natural quanto a luz do dia');
    const [textToConvert, setTextToConvert] = useState({ to_convert: '' });
    const [data, setData] = useState({});

    const handleInputChange = e => {
        const inputText = e.target.value;
        setInputText(inputText);
    }

    const handleOnClick = async () => {
        const to_convert = inputText;

        if (!to_convert) {
            setInputIsVoid(true);
            return;
        }
        setInputIsVoid(false);
        setTextToConvert({ to_convert });
        try {
            setIsLoading(true);
            console.log(textToConvert);
            const response = await fetch('https://pronome-neutre-conversor.herokuapp.com/convert', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(textToConvert)
            });
            // console.log(response);
            // const data = await response.json();
            // setSucess(true);
            // setData(data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }


    return (
        <Stack
            bg='#f5f5f5'
            display="flex"
            flex="1"
            alignContent="center"
            justifyContent="center"
            flexDirection='column'>

            <Text
                fontSize="4xl"
                textAlign="center"

            >Pronome Neutre Conversor</Text>

            <Textarea
                placeholder='Digite sua frase aqui'
                value={inputText}
                onChange={handleInputChange} />

            {inputIsVoid &&
                <Alert status="warning">
                    <AlertIcon />
                    Preencha o campo de texto!
                </Alert>}

            <Button
                isLoading={isLoading}
                loadingText="Convertendo"
                variantColor="teal"
                variant="solid"
                size='lg'
                onClick={handleOnClick}>
                Converter
            </Button>

        </Stack>
    );
}

export default Index;