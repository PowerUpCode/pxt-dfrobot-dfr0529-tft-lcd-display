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


        
    }

    //% blockId=Test_kuba block="Czy jest dobrze OK %ok"
    //% weight=400 blockGap=8
    export function test(ok: boolean): void {

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


    function writeData(dat: number): void {

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
