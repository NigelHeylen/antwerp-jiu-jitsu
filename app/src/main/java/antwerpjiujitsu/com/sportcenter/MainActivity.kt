package antwerpjiujitsu.com.sportcenter

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import kategory.implicit
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        main_text.text = x()
    }

}


fun x(@implicit a: String): String = a

@implicit
fun provideString() = "1"