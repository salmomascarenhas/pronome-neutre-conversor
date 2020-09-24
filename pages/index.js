import React, { useState } from 'react';
import { Stack, Textarea, Button, Text, Alert, AlertIcon } from '@chakra-ui/core';

const Index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [sucess, setSucess] = useState(false);
    const [inputIsVoid, setInputIsVoid] = useState(false);
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState({});

    const handleInputChange = e => {
        const inputText = e.target.value;
        setInputText(inputText);
    }

    const handleOnClick = async () => {

        if (!inputText) {
            setInputIsVoid(true);
            return;
        }
        setInputIsVoid(false);

        try {
            setIsLoading(true);
            const response = await fetch('https://pronome-neutre-conversor.herokuapp.com/convert', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ to_convert: inputText })
            });
            const data = await response.json();
            console.log(data)
            setData(data);
            setSucess(true);
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
            {sucess &&
                <Text fontSize="2xl">
                    {data.converted}
                </Text>}

        </Stack>
    );
}

export default Index;