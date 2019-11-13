export default class ApplicationError extends Error {

    public message: string;
    public name: string;
    public status: number;
    
    constructor( message: string, status: number ) {
        super();
        
        Error.captureStackTrace(this, this.constructor);
        
        this.name = this.constructor.name;
        
        this.message = message || 
            'Something went wrong. Please try again.';
        
        this.status = status || 500;
    }
}