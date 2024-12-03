import { isInt, IsInt, IsString, Max, Min } from "class-validator";

export class CreateSongDto {
    @IsString()
    cim : string;

    @IsString()
    szerzo : string;

    @IsInt()
    hossz: number;

    @IsInt()
    ar : number;

    @IsInt()
    @Min(1)
    @Max(5)
    ertekeles : number;
}
