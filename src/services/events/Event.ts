import aws from 'aws-sdk';
export default class Event {
    
    protected name: string;
    protected payload: any;

    public constructor(name: string, payload?: any){
        this.name = name;
        this.payload = payload;
        this.emit();
    }

    public emit() : void {
        // do something with aws sdk here.
        console.log(this.name, this.payload);
    }
}