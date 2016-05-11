import time
import base64
import urllib
import cloudstorage
from google.appengine.api import app_identity

def put(file, path, type='binary/octet-stream'):
    """Writes file's contents to the provided path.
    
    Args:
        file - file object that supports read()
        path - where to put the file
        type - mime type of the file. defaults to 'binary/octet-stream'
        
    Returns:
        Total number of bytes written
    """
    bucket = app_identity.get_default_gcs_bucket_name()
    cpath = '/' + bucket + '/' + path
    rf = cloudstorage.open(cpath, 'w', content_type=type, options={'x-goog-acl': 'private'})
    size = file.save(rf)
    rf.close()
    
    stat = cloudstorage.stat(cpath) 
    return stat.st_size
    
    
def get_url(path, ttl=15):
    """Returns a signed URL for accessing a resource in the provided path.
    
    Args:
        path - path to the resource
        ttl - signed URL expiry time in minutes
        
    Returns:
        Signed URL to the resource
    """
    expiry = int(round(time.time() + ttl * 60))
    bucket = app_identity.get_default_gcs_bucket_name()
    cpath = '/' + bucket + '/' + path

    data = []
    data.append('GET')          # Method
    data.append('')             # MD5 digest value
    data.append('')             # Content-type
    data.append(str(expiry))    # Expiry date
    data.append(cpath)          # Path to the resource
    data_str = "\n".join(data)
    print(type(data_str))
    
    signing_key_name, signature = app_identity.sign_blob(str(data_str))
    
    url = 'https://storage.googleapis.com'
    url += cpath
    url += '?GoogleAccessId=' + app_identity.get_service_account_name()
    url += '&Expires=' + str(expiry)
    url += '&Signature=' + urllib.quote_plus(base64.b64encode(signature))
    
    return url