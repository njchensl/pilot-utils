import {Col, FormGroup, Input, Label} from "reactstrap";

export function camelize(str: string): string {
    let result = str.split(' ')
        .map(a => a.trim())
        .map(a => a[0].toUpperCase() + a.substring(1))
        .join("");
    result = result[0].toLowerCase() + result.substring(1);
    return result;
}


export function generateInputField(type: string, fullName: string, state) {
    let camelizedName: string = camelize(fullName);
    return generateInputFieldFull(type, fullName, fullName, camelizedName, state);
}

export function generateInputFieldFull(type: string, fullName: string, placeholder: string, customCamelized: string, state) {
    console.log(state[customCamelized]);
    return (
        <FormGroup row>
            <Label htmlFor={customCamelized} md={2}>{fullName}</Label>
            <Col md={10}>
                <Input type={type} id={customCamelized} name={customCamelized}
                       placeholder={placeholder} value={state[customCamelized]}/>
            </Col>
        </FormGroup>
    );
}

export function mpsToKt(mps: number): number {
    return mps / 1.94384;
}

export function KtToMps(kt: number): number {
    return kt * 1.94384;
}

export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normalized(): Vector2 {
        let magnitude = this.magnitude();
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    add(rhs: Vector2): Vector2 {
        return new Vector2(this.x + rhs.x, this.y + rhs.y);
    }

    subtract(rhs: Vector2): Vector2 {
        return new Vector2(this.x - rhs.x, this.y - rhs.y);
    }

    multiply(rhs: number): Vector2 {
        return new Vector2(this.x * rhs, this.y * rhs);
    }

    magnitudeCross(rhs: Vector2): number {
        return this.x * rhs.y - this.y * rhs.x;
    }
}
