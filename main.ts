/**
 * makecode PowerUpCode DFRobot SPI LCD display package.
 */


let CS: DigitalPin
let RS: DigitalPin
let WR: DigitalPin
let LCK: DigitalPin
let SPI_MOSI: DigitalPin
let SPI_SCK: DigitalPin

let height = 127
let width = 127

    const rbits = hex`
    008040C020A060E0109050D030B070F0088848C828A868E8189858D838B878F8
    048444C424A464E4149454D434B474F40C8C4CCC2CAC6CEC1C9C5CDC3CBC7CFC
    028242C222A262E2129252D232B272F20A8A4ACA2AAA6AEA1A9A5ADA3ABA7AFA
    068646C626A666E6169656D636B676F60E8E4ECE2EAE6EEE1E9E5EDE3EBE7EFE
    018141C121A161E1119151D131B171F1098949C929A969E9199959D939B979F9
    058545C525A565E5159555D535B575F50D8D4DCD2DAD6DED1D9D5DDD3DBD7DFD
    038343C323A363E3139353D333B373F30B8B4BCB2BAB6BEB1B9B5BDB3BBB7BFB
    078747C727A767E7179757D737B777F70F8F4FCF2FAF6FEF1F9F5FDF3FBF7FFF`


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
    //% blockId=LCD_Init block="Init LCD || SPI_MOSI|%SPI_MOSI|SPI_SCK|%SPI_SCK|CS|%CS_|RS|%RS_|WR|%WR_|LCK|%LCK_"
    //% weight=400 blockGap=8
    //% color=#DF6721
    export function setup(SPI_MOSI_: DigitalPin = DigitalPin.P13 , SPI_SCK_: DigitalPin = DigitalPin.P15, CS_: DigitalPin = DigitalPin.P16, RS_: DigitalPin = DigitalPin.P2, WR_: DigitalPin = DigitalPin.P8, LCK_: DigitalPin = DigitalPin.P12 ): void  {
        
        CS = CS_
        RS = RS_
        WR = WR_
        LCK = LCK_
        SPI_MOSI = SPI_MOSI_
        SPI_SCK = SPI_SCK_

        pins.spiPins(SPI_MOSI, DigitalPin.P14, SPI_SCK)
        pins.spiFormat(8, 0)
        pins.spiFrequency(4000000)

        pins.digitalWritePin(CS, 1)
        pins.digitalWritePin(RS, 1)
        pins.digitalWritePin(WR, 1)
        pins.digitalWritePin(LCK, 1)

        initLCD()
        
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

    //% blockId=show_pixel block="Show pixel %x %y with color %color"
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

    function initLCD() {

        console.log('ST7687S begin')
        control.waitMicros(1200)

        writeCmd(0xd7); /// Disable auto read
        writeDat(0x9f);

        writeCmd(0xE0); /// EE control in
        writeDat(0x00);
        control.waitMicros(100);


        writeCmd(0xFA); /// Erase EEPROM data
        writeDat(0x01);
        control.waitMicros(200); 

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
        console.log('SPI transfer')
        console.log(cmd)
        //console.log(rbit(cmd))
        console.log('............')

        pins.spiWrite(cmd)

        if(action) {
            pins.digitalWritePin(LCK, 1)
            pDelay()
            pins.digitalWritePin(LCK, 0)
        }

    }


    function drawPixel(x: number, y: number, color: number):void {
        console.log('drawPixel begin')
        let colorBuf = pins.createBuffer(2);
        colorBuf[0] = ((color >> 8) & 0xff);
        colorBuf[1] = (color & 0xff);
        console.log(colorBuf[0])
        console.log(colorBuf[1])        
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
        console.log('setCursorAddr begin')
        let addrBuf = pins.createBuffer(2);
        addrBuf[0] = x0;
        addrBuf[1] = x1;
        console.log(addrBuf[0])
        console.log(addrBuf[1])
        //uint8_t addrBuf[2] = {(uint16_t)x0 , (uint16_t)x1};
        writeCmd(0x2a);
        writeDatBytes(addrBuf, 2);

        //addrBuf = pins.createBuffer(8);
        addrBuf[0] = y0;
        addrBuf[1] = y1;
        console.log(addrBuf[0])
        console.log(addrBuf[1])
  //addrBuf[0] = (uint16_t)y0; addrBuf[1] = (uint16_t)y1;
        writeCmd(0x2b);
        writeDatBytes(addrBuf, 2);
    }

    function limitPixel(x: number, y: number): number {
        //x += cursorX;
        //y += cursorY;
        //if((x < 0) || (y > height) ||  (x > width) || (y < 0)) {
        //    return -1;
        //}
        return 0;        
    }

    function writeRepeatPixel(color: number, count: number, repeatCount: number) {
            //uint8_t       colorBuf[2] = {color >> 8, color};
        let colorBuf = pins.createBuffer(2);
        colorBuf[0] = ((color >> 8) & 0xff);
        colorBuf[1] = (color & 0xff);            
        //uint32_t      i = 0;
        console.log('color');
        console.log(colorBuf[0]);
        console.log(colorBuf[1]);
        let i = 0;
        for(i = 0; i < repeatCount * count; i ++) {
            writeDatBytes(colorBuf, 2);
        }
    }


    function writeDatBytes(pDat: Buffer, count: number) {
        pins.digitalWritePin(RS, 1)
        pins.digitalWritePin(CS, 0)
        while(count --) {
            //spiWrite(*pDat, true)
            pins.digitalWritePin(WR, 0)
            pDelay()
            pins.digitalWritePin(WR, 1)
            //pDat ++;
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
        control.waitMicros(1)
    }

}
