/* Author:  Muhammad Abdulla (muhammad@yulghun.com)
 * Version: 1.2 (Feb. 7, 2009)
 * License: GPL
 */

var imode = 0; // input mode, default is Uyghur
var qmode = 0; // quote mode, 0 for opening, 1 for closing

var km = new Array ( 128 ); // keymap
var cm = new Array ( 256 ); // charmap

var PRIMe = 233; // 'e 
var PRIME = 201; // 'E 
var COLo  = 246; // :o 
var COLO  = 214; // :O 
var COLu  = 252; // :u 
var COLU  = 220; // :U 
var HAMZA = 0x0626;
var CHEE  = 0x0686;
var GHEE  = 0x063A;
var NGEE  = 0x06AD;
var SHEE  = 0x0634;
var SZEE  = 0x0698;

// right and left quotes in Uyghur
var OQUOTE = 0x00AB; // for opening quote (oh quote)
var CQUOTE = 0x00BB; // for closing quote 

var RCQUOTE = 0x2019; // 0x2019 is right closed curly quote

var BPAD = 0x0600;

// returns a char code for a given character
function gac ( ascii )
{
   var str = "" + ascii;
   return str.charCodeAt(0);
}

// returns a string from a given char code
function gas ( code )
{
   return String.fromCharCode(code);
}

var i;
var inited = false;

function bedit_init ( ) {
  var i;
  if ( inited ) {
    return;
  }

  inited = true;

  // zero-out all entries first
  for ( i = 0; i < km.length; i++ ) {
    km[i] = 0;
  }

  // Uyghur Unicode character map
  km[gac('a')] = 0x06BE;
  km[gac('b')] = 0x0628;
  km[gac('c')] = 0x063A;
  km[gac('D')] = 0x0698;
  km[gac('d')] = 0x062F;
  km[gac('e')] = 0x06D0;
  km[gac('F')] = 0x0641;
  km[gac('f')] = 0x0627;
  km[gac('G')] = 0x06AF;
  km[gac('g')] = 0x06D5;
  km[gac('H')] = 0x062E;
  km[gac('h')] = 0x0649;
  km[gac('i')] = 0x06AD;
  km[gac('J')] = 0x062C;
  km[gac('j')] = 0x0642;
  km[gac('K')] = 0x06C6;
  km[gac('k')] = 0x0643;
  km[gac('l')] = 0x0644;
  km[gac('m')] = 0x0645;
  km[gac('n')] = 0x0646;
  km[gac('o')] = 0x0648;
  km[gac('p')] = 0x067E;
  km[gac('q')] = 0x0686;
  km[gac('r')] = 0x0631;
  km[gac('s')] = 0x0633;
  km[gac('T')] = 0x0640; // space filler character
  km[gac('t')] = 0x062A;
  km[gac('u')] = 0x06C7;
  km[gac('v')] = 0x06C8;
  km[gac('w')] = 0x06CB;
  km[gac('x')] = 0x0634;
  km[gac('y')] = 0x064A;
  km[gac('z')] = 0x0632;
  km[gac('/')] = 0x0626;

  for ( i = 0; i < km.length; i++ ) {
    if ( km[i] != 0 ) {
      var u = gac(gas(i).toUpperCase());
      if ( km[u] == 0 ) {
        km[u] = km[i];
      }
    }
  }
  
  // Uyghur punctuation marks
  km[gac(';')] = 0x061B;
  km[gac('?')] = 0x061F;
  km[gac(',')] = 0x060C;
  km[gac('<')] = 0x203A; // for '‹'
  km[gac('>')] = 0x2039; // for '›'
  km[gac('"')] = OQUOTE;

  // adapt parens, brackets, and braces for right-to-left typing
  km[gac('{')] = gac ( '}' );
  km[gac('}')] = gac ( '{' );
  km[gac('[')] = gac ( ']' );
  km[gac(']')] = gac ( '[' );
  km[gac('(')] = gac ( ')' );
  km[gac(')')] = gac ( '(' );

  // special handling of braces ( "{" and "}" ) for quotation in Uyghur
  km[gac('}')] = 0x00AB;
  km[gac('{')] = 0x00BB;

  // zero-out all entries first
  for ( i = 0; i < cm.length; i++ ) {
    cm[i] = 0;
  }

  cm[gac('a')] = 0x0627;
  cm[gac('b')] = 0x0628;
  cm[gac('c')] = 0x0643;
  cm[gac('d')] = 0x062F;
  cm[gac('e')] = 0x06D5;
  cm[gac('f')] = 0x0641;
  cm[gac('g')] = 0x06AF;
  cm[gac('h')] = 0x06BE;
  cm[gac('i')] = 0x0649;
  cm[gac('j')] = 0x062C;
  cm[gac('k')] = 0x0643;
  cm[gac('l')] = 0x0644;
  cm[gac('m')] = 0x0645;
  cm[gac('n')] = 0x0646;
  cm[gac('o')] = 0x0648;
  cm[gac('p')] = 0x067E;
  cm[gac('q')] = 0x0642;
  cm[gac('r')] = 0x0631;
  cm[gac('s')] = 0x0633;
  cm[gac('t')] = 0x062A;
  cm[gac('u')] = 0x06C7;
  cm[gac('v')] = 0x06CB;
  cm[gac('w')] = 0x06CB;
  cm[gac('x')] = 0x062E;
  cm[gac('y')] = 0x064A;
  cm[gac('z')] = 0x0632;

  cm[PRIMe] = 0x06D0; // 'e
  cm[PRIME] = 0x06D0; // 'E
  cm[COLo]  = 0x06C6; // :o
  cm[COLO]  = 0x06C6; // :O
  cm[COLu]  = 0x06C8; // :u
  cm[COLU]  = 0x06C8; // :U

  for ( i = 0; i < cm.length; i++ ) {
    if ( cm[i] != 0 ) {
      var u = gac(gas(i).toUpperCase());
      if ( cm[u] == 0 ) {
        cm[u] = cm[i];
      }
    }
  }

  // Uyghur punctuation marks
  cm[gac(';')] = 0x061B;
  cm[gac('?')] = 0x061F;
  cm[gac(',')] = 0x060C;
}

function ak2uni ( akstr )
{
  var str = akstr;
  var akdif = String.fromCharCode(0x0622, 0x0623, 0x0624, 0x0626, 0x0629, 0x062B, 0x062D, 0x0630, 0x0635, 0x0636, 0x0638, 0x0649, 0x0639, 0x0647, gac('{'), gac('}'));
  var akuni = String.fromCharCode(0x0698, 0x06C6, 0x06CB, 0x06D0, 0x06D5, 0x06AD, 0x0686, 0x06C7, 0x067E, 0x06AF, 0x0626, 0x06C8, 0x0649, 0x06BE, CQUOTE, OQUOTE);

  for(var i = 0; i < akdif.length; i++ ) {
     str = str.replace(new RegExp(akdif.substr(i,1), "g"), akuni.substr(i,1));
  }

  return str;
}

function uly2uy ( ustr )
{
  var str = "";
  var i, cur, prev, next, ch;
  var ccode, ncode;
  var wdbeg = true;

  var bd = '`';  // beginning delimiter
  var ed = '`';  // ending delimiter

  var verbatim = false;

  var uly = ustr;

  // make URLs verbatim
  var regExp = /(\w+[p|s]:\/\/\S*)/gi;
  uly = uly.replace(regExp, bd + "$1" + ed );

  // URLs without ://
  regExp = /([\s|(]+\w+\.\w+\.\w+\S*)/g;
  uly = uly.replace(regExp, bd + "$1" + ed );

  // two-part URLs with well-known suffixes
  regExp = /([\s|(|,|.]+\w+\.(com|net|org|cn)[\s|)|\.|,|.|$])/g;
  uly = uly.replace(regExp, bd + "$1" + ed );

  // email addresses
  regExp = /(\w+@\w+\.\w[\w|\.]*\w)/g;
  uly = uly.replace(regExp, bd + "$1" + ed );

  if ( !inited ) {
    bedit_init();
  }

  for ( i = 0; i < uly.length; i++ ) {
    ch = 0;
    cur    = uly.charAt(i);
    next   = uly.charAt(i+1);
    ccode  = uly.charCodeAt(i);
    ncode  = uly.charCodeAt(i+1);

    if ( verbatim == true ) {
      if ( cur == ed ) { // ending verbatim mode
        verbatim = false;
      } else {
        str += cur; 
      }
      continue;
    }

    if ( cur == bd ) {
      verbatim = true;
      continue;
    }

    if ( cur == '|' && ( prev == 'u' ) && ( next == 'a' || next == 'e' ) ) {
      wdbeg = false;
      continue;
    }

    // add hamza in front of vowels in word-beginning positions
    if ( wdbeg == true ) {
      if ( isvowel(cur) ) {
        str += gas(HAMZA);
      }
    } else {
      if ( cur == '\'' || ccode == RCQUOTE ) {
        if ( isvowel(next) ) {
          wdbeg = false; // don't add another hamza in next round
          str += gas(HAMZA);
          continue;
        } else if ( isalpha(ncode) ) {
          continue;
        }
      }
    }

    // AA, AE, and non-alpha-numeric letters makes word beginning
    if ( isvowel(cur) || !isalpha(ccode) ) {
      wdbeg = true;
    } else { 
      wdbeg = false;
    }

    switch ( cur ) { // handle joint-letters
      case 'c':
      case 'C':
        if ( next == 'h' || next == 'H' ) {
          ch = CHEE;
        }    
        break;
     case 'g':
     case 'G':
       if ( next == 'h' || next == 'H' ) {
         ch = GHEE;
       }
       break;
     case 'n': 
     case 'N': 
       if ( next == 'g' || next == 'G' ) { 
         tmpch = uly.charAt(i+2); 
         if ( tmpch != 'h' && tmpch != 'H' ) {
           ch = NGEE;
         }
       }
       break;
     case 's':
     case 'S':
       if ( next == 'h' || next == 'H' ) {
         ch = SHEE;
       } else if ( next == 'z' || next == 'Z' ) { // ULY does not provide a unique SZEE, we use 'sz' 
         ch = SZEE;
       }
       break;
     default:
       break;
    }

    if ( ch != 0 ) {
      i++; // advance index for joint letters
      str += gas(ch);
    } else if ( ccode < cm.length && cm[ccode] ) {
      str += gas( cm[ccode] ); // no joint letter, but valid ULY
    } else {
      str += gas(ccode); // non-ULY, return whatever is entered
    }

    prev = cur;
  }

  return str;
}

// isvowel -- returns true if ch is a vowel in Uyghur
function isvowel ( ch )
{
  var code = gac ( ch ); 

  if ( ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' ||
       ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U' ) {
   return true;
  }

  if ( code == PRIMe || code == PRIME || code == COLo ||
     code == COLO || code == COLu || code == COLU ) {
   return true;
  } 

  return false;
}

function isalpha ( code )
{
  if ( (gac('A') <= code && code <= gac('Z')) || (gac('a') <= code && code <= gac('z')) ) {
    return true;
  }
  return false;
}

function AttachEvent(obj, evt, fnc, useCapture){
  if (!useCapture) useCapture = false;

  if (obj.addEventListener) {
    obj.removeEventListener(evt, fnc, useCapture);
    obj.addEventListener(evt, fnc, useCapture);
    return true;
  } else if (obj.attachEvent) {
    obj.detachEvent( "on" + evt, fnc);
    return obj.attachEvent( "on" + evt, fnc);
  }
}

// attach event handlers to textareas and textfields
function attachEvents ( )
{    
  if ( typeof(attachAll)=="undefined" || attachAll == null ) {
     attachAll = false;
  }
  if ( typeof(bedit_allow) != "undefined" && bedit_allow && bedit_allow.length != 0 ) {
    allowed_names = bedit_allow.split ( ':' );
  } else {
    allowed_names = new Array();
  }    
  if ( typeof(bedit_deny) != "undefined" && bedit_deny && bedit_deny.length != 0 ) {
    denied_names = bedit_deny.split ( ':' );
  } else {
    denied_names = new Array();;
  }      
     
  var tas = document.getElementsByTagName("TEXTAREA"); // textareas
  var tfs = document.getElementsByTagName("INPUT"); // input fields

  for ( i = 0; i < tas.length; i++ ) {
    if ( shouldAttach(tas[i].name) ) {
      AttachEvent ( tas[i], 'keypress', naddchar, false );
      AttachEvent ( tas[i], 'keydown', proc_kd, false );
    }
  }

  for ( i = 0; i < tfs.length; i++ ) {
    if ( tfs[i].type.toLowerCase() == "text" && shouldAttach(tfs[i].name)) {
      AttachEvent ( tfs[i], 'keypress', naddchar, false );
      AttachEvent ( tfs[i], 'keydown', proc_kd, false );
    }
  }
}

function shouldAttach ( name )
{
  var j;
  if ( attachAll == true ) {
    for ( j = 0; j < denied_names.length; j++ ) {
      if ( name == denied_names[j] ) {
        return false;
      }
    }
    return true;
  } else { // global attach is disabled, only attach those that are specified
    for ( j = 0; j < allowed_names.length; j++ ) {
      if ( name == allowed_names[j] ) {
        return true;
      }
    }
    return false;
  }
}

/* for Mozilla/Opera (taken from dean.edwards.name) */
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", bedit_onLoad, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
  document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
  var script = document.getElementById("__ie_onload");
  script.onreadystatechange = function() {
    if (this.readyState == "complete") {
      bedit_onLoad(); // call the onload handler
    }
  };
/*@end @*/

/* for webkit-based browsers */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
  var _timer = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
      bedit_onLoad(); // call the onload handler
    }
  }, 100);
}

// add  new onLoad while keeping the old, if any 
old_onLoad = null;
add_onLoad();

function add_onLoad()
{
  old_onLoad = window.onload;
  window.onload = bedit_onLoad;
}

function bedit_onLoad()
{
  // quit if this function has already been called
  if (arguments.callee.done) return; 
  arguments.callee.done = true;
  // kill the timer
  if (_timer) clearInterval(_timer);

  bedit_init();
  attachEvents();
  if ( old_onLoad ) {
    old_onLoad();
  }
}

function addchar(content, event) 
{
  return naddchar(event);
}

function proc_kd_ctrl_k ( source, ev )
{
  imode = 1 - imode;
  return true; 
}

function proc_kd_ctrl_j ( source, ev )
{
  var t = gsel(source);
  if ( t == "" ) {
     return false;
  } else {
    ins(source, ak2uni(t)); 
    return true;
  }
}

function proc_kd_ctrl_u ( source, ev )
{
  var t = gsel(source);
  if ( t == "" ) {
     return false;
  } else {
    ins(source, uly2uy(t)); 
    return true;
  }
}

function proc_kd_ctrl_t ( source, ev )
{
  if ( source.style.direction == "ltr" ) {
    source.style.direction = "rtl";
  } else {
    source.style.direction = "ltr";
  }
  return true;
}

function proc_kd(event)
{
  var x = false; // should cancel?

  var e = event ? event : window.event;
  var k = e.keyCode ? e.keyCode : e.which;
  var s =  e.srcElement ? e.srcElement : e.target; 

  if ( e.ctrlKey) {
    var f = false;
    for(var az = gac('A'); az <= gac('Z'); az++ ) {
      eval('if ( k == ' + az + ' && typeof proc_kd_ctrl_' + gas(az).toLowerCase() + ' == "function" ) { x = ' +  'proc_kd_ctrl_' + gas(az).toLowerCase() + '(s, e); f=true;}'); 
      if(f) break;
    }
  }

  if ( x ) {
    e.cancelBubble = true;
    if(e.preventDefault) e.preventDefault();
    if(e.stopPropagation) e.stopPropagation();
    e.returnValue = false;
    return false;
  }

  return true;
}

function gsel(source)
{
  var s = source;

  if ( document.all ) { 
    return document.selection.createRange().text;
  } else {
    var ss = s.selectionStart;
    var se = s.selectionEnd;
    if ( ss < se ) {
       return s.value.substring (ss, se);
    }
  }

  return "";
}

function ins(source, str)
{
  var s = source;

  if ( document.selection && document.selection.createRange) {
    document.selection.createRange().text = str;
  } else {
    // we cannot modify event.which in Mozilla/FireFox, have to do something more interesting
    var ss  = s.selectionStart;
    var se  = s.selectionEnd;

    // Mozilla/Firefox scrolls to top in textarea after text input, fix it:
    var sTop, sLeft;
    if (s.type == 'textarea' && typeof s.scrollTop != 'undefined') {
      sTop = s.scrollTop;
      sLeft = s.scrollLeft;
    }

    s.value = s.value.substring (0, ss) + str + s.value.substr(se);

    if (typeof sTop != 'undefined') {
      s.scrollTop = sTop;
      s.scrollLeft = sLeft;
    }

    s.setSelectionRange(ss + str.length, ss + str.length );
  }
}

// addchar
function naddchar(event)
{
  var e = event ? event : window.event;
  var k = e.keyCode ? e.keyCode : e.which;
  var s =  e.srcElement ? e.srcElement : e.target; 

  if ( !inited ) {
    bedit_init();
  }

  if ( !e.ctrlKey && !e.metaKey && imode == 0 && k < km.length && km[k] != 0 ) {
    if ( e.keyCode && !e.which ) {
      e.keyCode = km[k];
    } else {
      ins(s, gas(km[k]));

      if(e.preventDefault) e.preventDefault();
      if(e.stopPropagation) e.stopPropagation();
    }

    if ( k == gac('"') ) { // toggle double bracket on '"'
      km[k] = qmode ? OQUOTE : CQUOTE;
      qmode = 1 - qmode;
    }

    if ( ! e.keyCode || e.which ) {
      return false;
    }
  } 

  // cannot cancel keydown event in opera, do it in here for keypress
  if (/opera/i.test(navigator.userAgent) && e.ctrlKey) {
    var x = false;
    for(var az = gac('A'); az <= gac('Z'); az++ ) {
      eval('if(k == ' + az + ' && typeof proc_kd_ctrl_' + gas(az).toLowerCase() + ' == "function" ) { x = true }'); 
      if(x) break;
    }
    if(x) {
      e.preventDefault();
      return false;
    }
  }

  e.returnValue = true;
  return true;
}
