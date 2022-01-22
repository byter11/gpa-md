import { ReactElement } from "react";

export default class GpaChart {
    element: ReactElement<'svg'>;
    
    constructor({data}){
        this.element = null;
    }
}