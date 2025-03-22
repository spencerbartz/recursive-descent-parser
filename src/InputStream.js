class InputStream {
    #inputPointer;

    constructor(streamSource) {
        this.streamSource = streamSource;
        this.#inputPointer = 0;
    }

    getInputPointer() {
        return this.#inputPointer;
    }

    blockingPrompt(message) {
        //return new Promise(resolve => {
        const intervalId = setInterval(async () => {
                const input = await Prompts.prompt(message); // <- Problem: This does not block nor does it simulate blocking behavior
                
                if (input) {
                    debugger;
                    clearInterval(intervalId);
                    return input;
                }
            }, 1000);
        //});
    }
    
    async runPrompt() {
        const userInput = await this.blockingPrompt('Enter a value');
        console.log("User input:", userInput);
        return userInput;
    }


    async requestInput() {
        let input = undefined;
        if (this.streamSource.type === 'user') {
            // Prompts.prompt('test-prompt').then(x => {
            //     debugger;
            // });
            // input = this.runPrompt(); 

            input = this.blockingPrompt('Enter a value');
        } else if (this.streamSource.type === 'UI') {
            input = this.streamSource.value.charAt(this.#inputPointer);
            this.#inputPointer++;
        }

        if (!input) {
            throw new Error('Input was empty.');
        }

        return input.charCodeAt(0);
    }
}