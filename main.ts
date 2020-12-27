/**
 * makecode PowerUpCode DFRobot SPI LCD display package.
 */


let CS: DigitalPin
let RS: DigitalPin
let WR: DigitalPin
let LCK: DigitalPin

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
    //% blockId=LCD_Init block="Init LCD SPI_MOSI|%SPI_MOSI|SPI_SCK|%SPI_SCK|CS_|%CS_|RS_|%RS_|WR_|%WR_|LCK_|%LCK_"
    //% weight=400 blockGap=8
    export function setup(SPI_MOSI: DigitalPin , SPI_SCK: DigitalPin, CS_: DigitalPin, RS_: DigitalPin, WR_: DigitalPin, LCK_: DigitalPin ): void  {
        
        CS = CS_
        RS = RS_
        WR = WR_
        LCK = LCK_


        pins.spiPins(SPI_MOSI, DigitalPin.P14, SPI_SCK)
        pins.spiFrequency(4000000)

 
        pins.digitalWritePin(CS, 1)
        pins.digitalWritePin(RS, 1)
        pins.digitalWritePin(WR, 1)
        pins.digitalWritePin(LCK, 1)

        initLCD()
        
    }

    //% blockId=Test_kuba block="Czy jest dobrze OK %ok"
    //% weight=400 blockGap=8
    export function test(ok: boolean): void {

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

        pins.spiWrite(cmd)

        if(action) {
            pins.digitalWritePin(LCK, 1)
            pDelay()
            pins.digitalWritePin(LCK, 0)
        }

    }

    function pDelay() {
       // control.waitMicros(1)
    }

}
