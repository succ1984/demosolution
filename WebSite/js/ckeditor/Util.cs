﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewImageLibrary.Scripts.ckeditor
{
    public static class Util
    {
        public static T Parse<T>(object value)
        {
            try { return (T)System.ComponentModel.TypeDescriptor.GetConverter(typeof(T)).ConvertFrom(value.ToString()); }
            catch (Exception) { return default(T); }
        }
    }
}