


export const VALUES = {
    COUNTING: new Map<number,number|string>([
        [3,3],
        [6,6],
        [9,9],
        [12,12],
        [8,8],
        [11,11],
        [4, 4],
        [1,1],
        [5,5],
        [2,2,],
        [7,7],
        [10,10]
    ]),
    WHOLE: new Map<number,number|string>([
        [2,2],
        [5,5],
        [8,8],
        [11,11],
        [7,7],
        [10,10],
        [3,3],
        [0,0],
        [4,4],
        [1,1],
        [6,6],
        [9,9]
    ]),
    INTEGER: new Map<number,number|string>([
        [2,2],
        [-5,-5],
        [8,8],
        [-11,-11],
        [-7,-7],
        [10,10],
        [-3,-3],
        [0,0],
        [4,4],
        [-1,-1],
        [6,6],
        [-9,-9]
    ]),
    FRACTION: new Map<number,number|string>([
        [3/10, `<math>        
        <mfrac>
                  <mn>3</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [6/10, `<math>        
        <mfrac>
                    <mn>6</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [9/10, `<math>        
        <mfrac>
                    <mn>9</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [12/10, `<math>        
        <mfrac>
                    <mn>12</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [8/10, `<math>        
        <mfrac>
                    <mn>8</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [11/10, `<math>        
        <mfrac>
                    <mn>11</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [4/10, `<math>        
        <mfrac>
                    <mn>4</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [1/10, `<math>        
        <mfrac>
                    <mn>1</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [5/10, `<math>        
        <mfrac>
                    <mn>5</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [2/10, `<math>        
        <mfrac>
                    <mn>2</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [7/10, `<math>        
        <mfrac>
                    <mn>7</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`],
        [10/10, `<math>        
        <mfrac>
                    <mn>10</mn>
                    <mn>10</mn>
                </mfrac>
        </math>`]
    ]),
    RATIONAL: new Map<number,number|string>([
        [2/10, `<math>        
        <mfrac>
                  <mn>2</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [-5/10, `<math>        
        <mfrac>
                  <mn>-5</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [8/10, `<math>        
        <mfrac>
                  <mn>8</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [-11/10, `<math>        
        <mfrac>
                  <mn>-11</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [-7/10, `<math>        
        <mfrac>
                  <mn>-7</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [10/10, `<math>        
        <mfrac>
                  <mn>10</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [-3/10, `<math>        
        <mfrac>
                  <mn>-3</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [0,0],
        [4/10, `<math>        
        <mfrac>
                  <mn>4</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [-1/10, `<math>        
        <mfrac>
                  <mn>-1</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [6/10, `<math>        
        <mfrac>
                  <mn>6</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`],
        [-9/10, `<math>        
        <mfrac>
                  <mn>-9</mn>
                  <mn>10</mn>
              </mfrac>
        </math>`]
    ]),
    RADICAL: new Map<string|number,number|string>([
        ['144s8', `<math>
        <mrow>
            <mn>144</mn>
            <mo>&#x221A;</mo>
            <mn>8</mn>
            </mrow>
        </math>`],
        ['100s2', `<math>
        <mrow>
            <mn>100</mn>
            <mo>&#x221A;</mo>
            <mn>2</mn>
            </mrow>
        </math>`],
        ['-81s32', `<math>
        <mrow>
            <mn>-81</mn>
            <mo>&#x221A;</mo>
            <mn>32</mn>
            </mrow>
        </math>`],
        ['-121s18', `<math>
        <mrow>
            <mn>-121</mn>
            <mo>&#x221A;</mo>
            <mn>18</mn>
            </mrow>
        </math>`],
        ['64s2', `<math>
        <mrow>
            <mn>64</mn>
            <mo>&#x221A;</mo>
            <mn>2</mn>
            </mrow>
        </math>`,],
        ['36s32', `<math>
        <mrow>
            <mn>36</mn>
            <mo>&#x221A;</mo>
            <mn>32</mn>
            </mrow>
        </math>`],
        ['-25s18', `<math>
        <mrow>
            <mn>-25</mn>
            <mo>&#x221A;</mo>
            <mn>18</mn>
            </mrow>
        </math>`],
        ['-49s8', `<math>
        <mrow>
            <mn>-49</mn>
            <mo>&#x221A;</mo>
            <mn>8</mn>
            </mrow>
        </math>`],
        ['16s32', `<math>
        <mrow>
            <mn>16</mn>
            <mo>&#x221A;</mo>
            <mn>32</mn>
            </mrow>
        </math>`],
        ['4s18', `<math>
        <mrow>
            <mn>4</mn>
            <mo>&#x221A;</mo>
            <mn>18</mn>
            </mrow>
        </math>`],
        ['-1s8', `<math>
        <mrow>
            <mn>-1</mn>
            <mo>&#x221A;</mo>
            <mn>8</mn>
            </mrow>
        </math>`],
        ['-9s2', `<math>
        <mrow>
            <mn>-9</mn>
            <mo>&#x221A;</mo>
            <mn>2</mn>
            </mrow>
        </math>`],
    ])
}