/**
 * makecode PowerUpCode DFRobot SPI LCD display package.
 */







const rbits = hex`
008040C020A060E0109050D030B070F0088848C828A868E8189858D838B878F8
048444C424A464E4149454D434B474F40C8C4CCC2CAC6CEC1C9C5CDC3CBC7CFC
028242C222A262E2129252D232B272F20A8A4ACA2AAA6AEA1A9A5ADA3ABA7AFA
068646C626A666E6169656D636B676F60E8E4ECE2EAE6EEE1E9E5EDE3EBE7EFE
018141C121A161E1119151D131B171F1098949C929A969E9199959D939B979F9
058545C525A565E5159555D535B575F50D8D4DCD2DAD6DED1D9D5DDD3DBD7DFD
038343C323A363E3139353D333B373F30B8B4BCB2BAB6BEB1B9B5BDB3BBB7BFB
078747C727A767E7179757D737B777F70F8F4FCF2FAF6FEF1F9F5FDF3FBF7FFF`


const table_character_6_8: number [][] = 
[
        [0x00, 0x00, 0x00, 0x00, 0x00, 0x00],//space
        [0x00, 0x00, 0x5F, 0x00, 0x00, 0x00],//!
        [0x00, 0x07, 0x00, 0x07, 0x00, 0x00],//"
        [0x14, 0x7F, 0x14, 0x7F, 0x14, 0x00],//#
        [0x24, 0x2A, 0x7F, 0x2A, 0x12, 0x00],//$
        [0x23, 0x13, 0x08, 0x64, 0x62, 0x00],//%
        [0x36, 0x49, 0x56, 0x20, 0x50, 0x00],//&
        [0x00, 0x08, 0x07, 0x03, 0x00, 0x00],//'
        [0x00, 0x1C, 0x22, 0x41, 0x00, 0x00],//(
        [0x00, 0x41, 0x22, 0x1C, 0x00, 0x00],//)
        [0x24, 0x18, 0x7E, 0x18, 0x24, 0x00],//*
        [0x08, 0x08, 0x3E, 0x08, 0x08, 0x00],//+
        [0x00, 0x80, 0x70, 0x30, 0x00, 0x00],//,
        [0x08, 0x08, 0x08, 0x08, 0x08, 0x00],//-
        [0x00, 0x00, 0x60, 0x60, 0x00, 0x00],//.
        [0x20, 0x10, 0x08, 0x04, 0x02, 0x00],///
        [0x3E, 0x41, 0x49, 0x41, 0x3E, 0x00],//0
        [0x00, 0x42, 0x7F, 0x40, 0x00, 0x00],//1
        [0x72, 0x49, 0x49, 0x49, 0x46, 0x00],//2
        [0x21, 0x41, 0x49, 0x4D, 0x32, 0x00],//3
        [0x18, 0x14, 0x12, 0x7F, 0x10, 0x00],//4
        [0x27, 0x45, 0x45, 0x45, 0x38, 0x00],//5
        [0x3C, 0x4A, 0x49, 0x49, 0x31, 0x00],//6
        [0x41, 0x21, 0x11, 0x09, 0x07, 0x00],//7
        [0x36, 0x49, 0x49, 0x49, 0x36, 0x00],//8
        [0x46, 0x49, 0x49, 0x29, 0x16, 0x00],//9
        [0x00, 0x00, 0x14, 0x00, 0x00, 0x00],//:
        [0x00, 0x40, 0x34, 0x00, 0x00, 0x00],//;
        [0x00, 0x08, 0x14, 0x22, 0x41, 0x00],//<
        [0x14, 0x14, 0x14, 0x14, 0x14, 0x00],//=
        [0x00, 0x41, 0x22, 0x14, 0x08, 0x00],//>
        [0x02, 0x01, 0x59, 0x09, 0x06, 0x00],//?
        [0x3E, 0x41, 0x5D, 0x59, 0x4E, 0x00],//@
        [0x7C, 0x12, 0x11, 0x12, 0x7C, 0x00],//A
        [0x7F, 0x49, 0x49, 0x49, 0x36, 0x00],//B
        [0x3E, 0x41, 0x41, 0x41, 0x22, 0x00],//C
        [0x7F, 0x41, 0x41, 0x41, 0x3E, 0x00],//D
        [0x7F, 0x49, 0x49, 0x49, 0x41, 0x00],//E
        [0x7F, 0x09, 0x09, 0x09, 0x01, 0x00],//F
        [0x3E, 0x41, 0x41, 0x51, 0x73, 0x00],//G
        [0x7F, 0x08, 0x08, 0x08, 0x7F, 0x00],//H
        [0x00, 0x41, 0x7F, 0x41, 0x00, 0x00],//I
        [0x20, 0x40, 0x41, 0x3F, 0x01, 0x00],//J
        [0x7F, 0x08, 0x14, 0x22, 0x41, 0x00],//K
        [0x7F, 0x40, 0x40, 0x40, 0x40, 0x00],//L
        [0x7F, 0x02, 0x1C, 0x02, 0x7F, 0x00],//M
        [0x7F, 0x04, 0x08, 0x10, 0x7F, 0x00],//N
        [0x3E, 0x41, 0x41, 0x41, 0x3E, 0x00],//O
        [0x7F, 0x09, 0x09, 0x09, 0x06, 0x00],//P
        [0x3E, 0x41, 0x51, 0x21, 0x5E, 0x00],//Q
        [0x7F, 0x09, 0x19, 0x29, 0x46, 0x00],//R
        [0x26, 0x49, 0x49, 0x49, 0x32, 0x00],//S
        [0x03, 0x01, 0x7F, 0x01, 0x03, 0x00],//T
        [0x3F, 0x40, 0x40, 0x40, 0x3F, 0x00],//U
        [0x1F, 0x20, 0x40, 0x20, 0x1F, 0x00],//V
        [0x3F, 0x40, 0x38, 0x40, 0x3F, 0x00],//W
        [0x63, 0x14, 0x08, 0x14, 0x63, 0x00],//X
        [0x03, 0x04, 0x78, 0x04, 0x03, 0x00],//Y
        [0x61, 0x59, 0x49, 0x4D, 0x43, 0x00],//Z
        [0x00, 0x7F, 0x41, 0x41, 0x41, 0x00],//[
        [0x02, 0x04, 0x08, 0x10, 0x20, 0x00],//"\"
        [0x00, 0x41, 0x41, 0x41, 0x7f, 0x00],//]
        [0x04, 0x02, 0x01, 0x02, 0x04, 0x00],//^
        [0x40, 0x40, 0x40, 0x40, 0x46, 0x00],//_
        [0x00, 0x03, 0x07, 0x08, 0x00, 0x00],//'
        [0x20, 0x54, 0x54, 0x78, 0x40, 0x00],//a
        [0x7F, 0x28, 0x44, 0x44, 0x38, 0x00],//b
        [0x38, 0x44, 0x44, 0x44, 0x28, 0x00],//c
        [0x38, 0x44, 0x44, 0x28, 0x7F, 0x00],//d
        [0x38, 0x54, 0x54, 0x54, 0x18, 0x00],//e
        [0x00, 0x08, 0x7E, 0x09, 0x02, 0x00],//f
        [0x38, 0xA4, 0xA4, 0x9C, 0x78, 0x00],//g
        [0x7F, 0x08, 0x04, 0x04, 0x78, 0x00],//h
        [0x00, 0x44, 0x7D, 0x40, 0x00, 0x00],//i
        [0x20, 0x40, 0x40, 0x3D, 0x00, 0x00],//j
        [0x7F, 0x10, 0x28, 0x44, 0x00, 0x00],//k
        [0x00, 0x41, 0x7F, 0x40, 0x00, 0x00],//l
        [0x7C, 0x04, 0x78, 0x04, 0x78, 0x00],//m
        [0x7C, 0x08, 0x04, 0x04, 0x78, 0x00],//n
        [0x38, 0x44, 0x44, 0x44, 0x38, 0x00],//o
        [0xFC, 0x18, 0x24, 0x24, 0x18, 0x00],//p
        [0x18, 0x24, 0x24, 0x18, 0xFC, 0x00],//q
        [0x7C, 0x08, 0x04, 0x04, 0x08, 0x00],//r
        [0x48, 0x54, 0x54, 0x54, 0x24, 0x00],//s
        [0x04, 0x04, 0x3F, 0x44, 0x24, 0x00],//t
        [0x3C, 0x40, 0x40, 0x20, 0x7C, 0x00],//u
        [0x1C, 0x20, 0x40, 0x20, 0x1C, 0x00],//v
        [0x3C, 0x40, 0x20, 0x40, 0x3C, 0x00],//w
        [0x44, 0x28, 0x10, 0x28, 0x44, 0x00],//x
        [0x4C, 0x90, 0x90, 0x90, 0x7C, 0x00],//y
        [0x44, 0x64, 0x54, 0x4C, 0x44, 0x00],//z
        [0x00, 0x08, 0x36, 0x41, 0x00, 0x00],//{
        [0x00, 0x00, 0x77, 0x00, 0x00, 0x00],//|
        [0x00, 0x41, 0x36, 0x08, 0x00, 0x00],//}
        [0x02, 0x01, 0x02, 0x04, 0x02, 0x00],//~
        [0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
]


enum color_list {
    
DISPLAY_BLACK=0x0000,      /*   0,   0,   0 */
DISPLAY_NAVY=0x000F,      /*   0,   0, 128 */
DISPLAY_DARKGREEN=0x03E0,      /*   0, 128,   0 */
DISPLAY_DARKCYAN=0x03EF,      /*   0, 128, 128 */
DISPLAY_MAROON=0x7800,      /* 128,   0,   0 */
DISPLAY_PURPLE=0x780F,     /* 128,   0, 128 */
DISPLAY_OLIVE=0x7BE0,     /* 128, 128,   0 */
DISPLAY_LIGHTGREY=0xC618,      /* 192, 192, 192 */
DISPLAY_DARKGREY=0x7BEF,      /* 128, 128, 128 */
DISPLAY_BLUE=0x001F,      /*   0,   0, 255 */
DISPLAY_GREEN=0x07E0,      /*   0, 255,   0 */
DISPLAY_CYAN=0x07FF,      /*   0, 255, 255 */
DISPLAY_RED=0xF800,      /* 255,   0,   0 */
DISPLAY_MAGENTA=0xF81F,      /* 255,   0, 255 */
DISPLAY_YELLOW=0xFFE0,      /* 255, 255,   0 */
DISPLAY_WHITE=0xFFFF,      /* 255, 255, 255 */
DISPLAY_ORANGE=0xFD20,      /* 255, 165,   0 */
DISPLAY_GREENYELLOW=0xAFE5,      /* 173, 255,  47 */
DISPLAY_PINK=0xF81F
};


/**
 * LCD0529 mudule
 */
//% weight=100 color=#DF6721 icon="\uf013" block="LCD Display"
namespace LCD0529 {

let display: Display
const DISPLAY_ROUND = 1;
const DISPLAY_RECTANGLE = 2;

const MODE_CORNER = 1;
const MODE_MIDDLE = 2;

let CS: DigitalPin
let RS: DigitalPin
let WR: DigitalPin
let LCK: DigitalPin
let SPI_MOSI: DigitalPin
let SPI_SCK: DigitalPin

let TextColor: int32
let TextBgColor: int32
let TextSize: int8





    class Display {
        constructor(
            public width: number,
            public height: number,
            public typ: number,
            public mode: number,

        ) {

            this.update()
        }  

        public update() {

        }      
    }

    /**
	 * LCD Initialize
     * 
     * MISO pins.P14
     * 
     * SPI_MOSI pins.P15
     * SPI_SCK pins.P13
     * CS pins.P16
     * WR pins.P8
     * 
     * 
	*/
    //% blockId=LCD_Init block="Init LCD || SPI_MOSI|%SPI_MOSI_|SPI_SCK|%SPI_SCK_|CS|%CS_|RS|%RS_|WR|%WR_|LCK|%LCK_"
    //% weight=400 blockGap=8
    //% color=#DF6721
    //% SPI_MOSI_.fieldEditor="gridpicker" SPI_MOSI_.fieldOptions.columns=4
    //% SPI_MOSI_.fieldOptions.tooltips="false" SPI_MOSI_.fieldOptions.width="250"
    //% SPI_SCK_.fieldEditor="gridpicker" SPI_SCK_.fieldOptions.columns=4
    //% SPI_SCK_.fieldOptions.tooltips="false" SPI_SCK_.fieldOptions.width="250"




    export function setup(SPI_MOSI_: DigitalPin = DigitalPin.P13 , SPI_SCK_: DigitalPin = DigitalPin.P15, CS_: DigitalPin = DigitalPin.P16, RS_: DigitalPin = DigitalPin.P2, WR_: DigitalPin = DigitalPin.P8, LCK_: DigitalPin = DigitalPin.P12 ): void  {
        
        CS = CS_
        RS = RS_
        WR = WR_
        LCK = LCK_
        SPI_MOSI = SPI_MOSI_
        SPI_SCK = SPI_SCK_

        pins.spiPins(SPI_MOSI, DigitalPin.P14, SPI_SCK)
        pins.spiFormat(8, 0)
        pins.spiFrequency(8000000)

        pins.digitalWritePin(CS, 1)
        pins.digitalWritePin(RS, 1)
        pins.digitalWritePin(WR, 1)
        pins.digitalWritePin(LCK, 1)

        initLCD()

        display = new Display(128,128, DISPLAY_ROUND, MODE_CORNER)
        
    }

    //% blockId=fill_screen block="Fill screen with color %color"
    //% weight=400 blockGap=8
    export function fillScreen(color: color_list): void {
        //uint8_t i, j;
        //_DEBUG_PRINT("\nfill screen");
        setCursorAddr(0, 0, 128, 128);
        writeToRam();
        writeRepeatPixel(color, 128, 128);
    }

    //% blockId=show_pixel block="Show pixel x|%x y|%y with color %color"
    //% weight=400 blockGap=8
    export function showPixel(x: number, y: number, color: color_list) {
        drawPixel(x, y, color)
    }

    //% blockId=lcd_off block="Disable LCD"
    //% weight=400 blockGap=8
    export function disableLCD() {
        writeCmd(0x28); /// display off
        writeCmd(0x11);	/// Sleep Out
        control.waitMicros(300);
    }

    //% blockId=lcd_on block="Enable LCD"
    //% weight=400 blockGap=8
    export function enableLCD() {
        writeCmd(0x29); /// display on
        control.waitMicros(300);
    }

    //% blockId=reset_display_memory block="Reset memory"
    //% weight=400 blockGap=8

    export function resetDisplay() {
        writeCmd(0xFA); /// Erase EEPROM data
        writeDat(0x01);
        control.waitMicros(200); 
    }

    //% blockId=draw_v_line block="Draw vertical line from x %x y %y with lenght %lenght color %color"
    //% weight=800 blockGap=8
    export function drawVLine(x: number, y: number, lenght: number, color: color_list)
    {
        //if((x + cursorX < 0) || (x + cursorX > width)) {return;}
        let direction = 1;
        let var1 = y + lenght;
        if(lenght < 0) {
            direction = -1;
        }
        for(; y != var1; y += direction) {
            drawPixel(x, y, color);
        }
    }

    //% blockId=draw_h_line block="Draw horizontal line from x %x y %y with lenght %lenght color %color"
    //% weight=800 blockGap=8
    export function drawHLine(x: number, y: number, lenght: number, color: color_list)
    {
        //if((x + cursorX < 0) || (x + cursorX > width)) {return;}
        let direction = 1;
        let var1 = x + lenght;
        if(lenght < 0) {
            direction = -1;
        }
        for(; x != var1; x += direction) {
            drawPixel(x, y, color);
        }
    }

    //% blockId=draw_rectangle block="Draw rectangle from x %x y %y with width %width height %height and color %color"
    //% weight=800 blockGap=8
    export function drawRect(x: number, y: number, width: number, height: number, 
                                        color: color_list)
    {
        let dirX = (width > 0) ? -1 : 1;
        let dirY = (height > 0) ? -1 : 1;
        drawHLine(x, y, width, color);
        drawHLine(x, y + height + dirY, width, color);
        drawVLine(x, y, height, color);
        drawVLine(x + width + dirX, y, height, color);
    } 

    //% blockId=draw_fill_rectangle block="Draw filled rectangle from x %x y %y with width %width height %height and color %color"
    //% weight=800 blockGap=8
    export function fillRect(x: number, y: number, width: number, height: number, 
                                            color: color_list)
    {
        let directionX = 1;
        let var1 = x + width;
        if(width < 0) {
            directionX = -1;
        }
        for(; x != var1; x += directionX) {
            drawVLine(x, y, height, color);
        }
    }   


    //% blockId=set_text_color block="Set text color to %color"
    //% weight=800 blockGap=8
    export function setTextColor(color: color_list)

    {
        TextColor = color;
    }


    //% blockId=set_text_background_color block="Set text background color to %color"
    //% weight=800 blockGap=8
    export function setTextBackgroundColor(color: color_list) {
        TextBgColor = color;
    }


    //% blockId=set_text_size block="Set text size to %color"
    //% weight=800 blockGap=8
    export function setTextSize(size: number) {
        TextSize = size;
    }

    //% blockId=draw_text block="Draw text %text on x: %x, y: %y"
    //% weight=800 blockGap=8
    export function drawText(x: number, y: number, text: string) {
        
        let characterBuffer: uint8 [];
        let rslt = 0;
        let i = 0, j = 0, k = 0;
        let var1 = 0;
        let textWidth = 0, textHeight = 0;

        while (text) {
            //rslt = getCharacter(text, characterBuffer, textWidth, textHeight);
            fillRect(x, y, textWidth * TextSize, textHeight * TextSize, TextBgColor);
        }

 



    }


    //function getCharacter(ch: string, chBuf: uint8 [], tWidth: int8, tHeight: int8): number
    //{

    //    return 0;
    //}


    function initLCD() {

        console.log('ST7687S begin')
        control.waitMicros(1200)

        writeCmd(0xd7); /// Disable auto read
        writeDat(0x9f);

        writeCmd(0xE0); /// EE control in
        writeDat(0x00);
        control.waitMicros(100);

/*
        writeCmd(0xFA); /// Erase EEPROM data
        writeDat(0x01);
        control.waitMicros(200); 
*/
        writeCmd(0xE3); /// Read from EEPROM
        control.waitMicros(200);
        writeCmd(0xE1);	


        writeCmd(0x28); /// display off
        writeCmd(0x11);	/// Sleep Out
        control.waitMicros(300);


        writeCmd(0xc0); /// Vop setting
        writeDat(0x17);  //ctrL=0x1b 080416 5PCS 0X1E; 8PCS 0X2A ?????
        writeDat(0x01);  // base on Module      

        writeCmd(0x25); /// Write Contrast
        writeDat(0x1E);
        writeCmd(0xC3); /// Bias selection
        writeDat(0x03);

        writeCmd(0xC4); /// Booster setting
        writeDat(0x07);

        writeCmd(0xC5);
        writeDat(0x01);

        writeCmd(0xCB); /// Vg source control
        writeDat(0x01); // Vg from 2xVdda

        writeCmd(0xB7);
        writeDat(0x00);

        writeCmd(0xD0); /// Analog circuit setting
        writeDat(0x1d);
        writeCmd(0xB5); /// N-line Setting
        writeDat(0x89);

        writeCmd(0xBD); ///cross talk compensation setting
        writeDat(0x02);     

        writeCmd(0xF0);	/// Frame Freq. in Temp range A,B,C and D
        writeDat(0x07);
        writeDat(0x0C);
        writeDat(0x0C);
        writeDat(0x12);   


        writeCmd(0xF4);	///TC setting
        writeDat(0x33);
        writeDat(0x33);
        writeDat(0x33);
        writeDat(0x00);
        writeDat(0x33);
        writeDat(0x66);
        writeDat(0x66);
        writeDat(0x66);

        writeCmd(0x20);
        writeCmd(0x2A);
        writeDat(0x00);
        writeDat(0x7F);

        writeCmd(0x2B); /// Row address setting
        writeDat(0x00); // 0~127
        writeDat(0x7f);    

        writeCmd(0x3A); /// Interface Pixel Format
        writeDat(0x05); // 16bits/pixel

        writeCmd(0x36); /// Memory data access control
        writeDat(0x80); //0xc8


        writeCmd(0xB0); ///Display Duty Setting
        writeDat(0x7F); // Duty = 128 duty

        writeCmd(0x29); /// Display On

        writeCmd(0xF9);	/// Set frame RGB value
        writeDat(0x00);
        writeDat(0x02);
        writeDat(0x04);
        writeDat(0x06);
        writeDat(0x08);
        writeDat(0x0a);
        writeDat(0x0c);
        writeDat(0x0e);
        writeDat(0x10);
        writeDat(0x12);
        writeDat(0x14);
        writeDat(0x16);
        writeDat(0x18);
        writeDat(0x1A);
        writeDat(0x1C);
        writeDat(0x1E);

        writeCmd(0x29); /// Display On       


        
    }


    function writeCmd(cmd: number): void {

        pins.digitalWritePin(RS, 0)
        pins.digitalWritePin(CS, 0)

        spiWrite(cmd, true)

        pins.digitalWritePin(WR, 0)
        pDelay()
        pins.digitalWritePin(WR, 1)
        pins.digitalWritePin(CS, 1)

    }


    function writeDat(dat: number): void {

        pins.digitalWritePin(RS, 1)
        pins.digitalWritePin(CS, 0)

        spiWrite(dat, true)

        pins.digitalWritePin(WR, 0)
        pDelay()
        pins.digitalWritePin(WR, 1)
        pins.digitalWritePin(CS, 1)        

    }

    function spiWrite(cmd: number, action: boolean) {
        //console.log('SPI transfer')
        //console.log(cmd)
        //console.log(rbit(cmd))
        //console.log('............')

        pins.spiWrite(cmd)

        if(action) {
            pins.digitalWritePin(LCK, 1)
            pDelay()
            pins.digitalWritePin(LCK, 0)
        }

    }


    function drawPixel(x: number, y: number, color: number):void {
        //console.log('drawPixel begin')
        let colorBuf = pins.createBuffer(2);
        colorBuf[0] = ((color >> 8) & 0xff);
        colorBuf[1] = (color & 0xff);
        //console.log(colorBuf[0])
        //console.log(colorBuf[1])        
        //var high = ((firstNumber >> 8) & 0xff);
        ///var low = firstNumber & 0xff;
        //console.log(colorBuf[0])
        //uint8_t colorBuf[2] = {color >> 8, color};
        if(limitPixel(x, y) < 0) {return;}
        setCursorAddr(x, y, x, y);
        writeToRam();
        writeDatBytes(colorBuf, 2);        
    }


    function setCursorAddr(x0: number, y0: number, x1: number, y1: number) {
        //console.log('setCursorAddr begin')
        let addrBuf = pins.createBuffer(2);
        addrBuf[0] = x0;
        addrBuf[1] = x1;
        //console.log(addrBuf[0])
        //console.log(addrBuf[1])
        //uint8_t addrBuf[2] = {(uint16_t)x0 , (uint16_t)x1};
        writeCmd(0x2a);
        writeDatBytes(addrBuf, 2);

        //addrBuf = pins.createBuffer(8);
        addrBuf[0] = y0;
        addrBuf[1] = y1;
        //console.log(addrBuf[0])
        //console.log(addrBuf[1])
  //addrBuf[0] = (uint16_t)y0; addrBuf[1] = (uint16_t)y1;
        writeCmd(0x2b);
        writeDatBytes(addrBuf, 2);
    }

    function limitPixel(x: number, y: number): number {
        if(display.typ === DISPLAY_ROUND) {
            if(display.mode === MODE_CORNER) {
                let centerX = display.width / 2
                let centerY = display.height / 2
                let radius = Math.max(centerX, centerY)

                let distance = Math.abs(Math.sqrt(Math.pow((x-centerX), 2)+Math.pow((y-centerY), 2)))

                if(distance > radius) {
                    return -1
                }
            }

        } else {
            if(x < 0 || x > (display.width-1) || y < 0 || y > (display.height-1)) {
                return -1
            }
        }

        return 0;        
    }

    function writeRepeatPixel(color: number, count: number, repeatCount: number) {
            //uint8_t       colorBuf[2] = {color >> 8, color};
        let colorBuf = pins.createBuffer(2);
        colorBuf[0] = ((color >> 8) & 0xff);
        colorBuf[1] = (color & 0xff);            
        //uint32_t      i = 0;
        //console.log('color');
        //console.log(colorBuf[0]);
        //console.log(colorBuf[1]);
        let i = 0;
        for(i = 0; i < repeatCount * count; i ++) {
            writeDatBytes(colorBuf, 2);
        }
    }


    function writeDatBytes(pDat: Buffer, count: number) {
        pins.digitalWritePin(RS, 1)
        pins.digitalWritePin(CS, 0)
        let i = 0;
        while(count --) {
            spiWrite(pDat[i], true)
            pins.digitalWritePin(WR, 0)
            pDelay()
            pins.digitalWritePin(WR, 1)
            i ++;
        }
        pins.digitalWritePin(CS, 1)
    }

    function writeToRam():void {
        writeCmd(0x2c);
    }


    function rbuffer(b: Buffer): Buffer {
        let output = pins.createBuffer(b.length);
        for (let i = 0; i < b.length; i++) {
            let n = b[i]
            output[i] = rbit(n)
        }
        return output
    }


    function rbit(value: number): number {
        return rbits[value] || 0x00;
    }    

    function pDelay() {
        //control.waitMicros(1)
    }

    //uint16_t color24To16(uint8_t r, uint8_t g, uint8_t b)
    //{
    //  return (uint16_t)((((uint16_t)r >> 3) << 11) | (((uint16_t)g >> 2) << 5) | ((uint16_t)b >> 3));
    //}



}
