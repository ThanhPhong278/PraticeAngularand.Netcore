export function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })
}

export function parseWebAPIErrors(respone: any): string[]{
    const result: string[] = [];
    if(respone.error){
        if(typeof respone.error === 'string'){
            result.push(respone.result);
        }else{
            const mapErrors = respone.error.errors;
            const entries = Object.entries(mapErrors);
            entries.forEach((arr: any[]) => {
                const field = arr[0];
                arr[1].forEach(errorMessage => {
                    result.push(`${field}: ${errorMessage}`)
                })
            })
        }
    }
    return result
}