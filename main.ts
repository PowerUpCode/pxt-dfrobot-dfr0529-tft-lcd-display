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
	*/
    //% blockId=LCD_Init block="Init LCD SPI_MOSI|%SPI_MOSI|SPI_SCL|%SPI_SCL|WR|%WR|CS|%CS|RS|%RS|LCK|%LCK"
    //% weight=400 blockGap=8
    export function setup(SPI_MOSI: DigitalPin , SPI_SCL: DigitalPin, WR: DigitalPin, CS: DigitalPin, RS: DigitalPin, LCK: DigitalPin ): void  {

    }

    //% blockId=Test_kuba block="Czy jest dobrze OK %ok"
    //% weight=400 blockGap=8
    export function test(ok: boolean): void {

    }

}
