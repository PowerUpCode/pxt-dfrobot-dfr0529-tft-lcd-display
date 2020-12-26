/**
 * makecode PowerUpCode DFRobot SPI LCD display package.
 */

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
     * 
     * 
	*/
    //% blockId=LCD_Init block="Init LCD SPI_MOSI|%SPI_MOSI|SPI_SCK|%SPI_SCK|WR|%WR|CS|%CS|RS|%RS|LCK|%LCK"
    //% weight=400 blockGap=8
    export function setup(SPI_MOSI: DigitalPin , SPI_SCK: DigitalPin, WR: DigitalPin, CS: DigitalPin, RS: DigitalPin, LCK: DigitalPin ): void  {
        pins.spiPins(SPI_MOSI, DigitalPin.P14, SPI_SCK)
 
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

    }

}
